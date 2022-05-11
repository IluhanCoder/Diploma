const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const eventController = require("../controllers/event-controller");
const multer = require("multer");
const path = require("path");
const propositionController = require("../controllers/proposition-controller");
const inviteController = require("../controllers/invite-controller");
const commentController = require("../controllers/comment-controller");
const commentService = require("../service/comment-service");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorageEngine,
});

//handles user's registration
router.post(
  "/registration",
  body("login")
    .isLength({ min: 3, max: 18 })
    .withMessage("Довжина Логіну має бути від 3 до 18 символів "),
  body("email")
    .isEmail()
    .withMessage("Адреса елекроної пошти має відповідати формату: нік@пошта"),
  //todo: fix date validation
  body("cell")
    .isMobilePhone()
    .withMessage("Введені цифри не є номером телефону"),
  body("city")
    .isLength({ min: 3, max: 24 })
    .withMessage("Місто має довжину від 3 до 24 символів"),
  body("password")
    .isLength({ min: 5, max: 24 })
    .withMessage("Пароль має бути довжиною від 5 до 24 символів"),
  userController.registration
);
//handles user's login
router.post(
  "/login",
  body("login")
    .isLength({ min: 3, max: 18 })
    .withMessage("Довжина Логіну має бути від 3 до 18 символів "),
  userController.loginF
);
//handles user's logout
router.post("/logout", userController.logout);
//sets user's avatar
router.post("/avatar", upload.single("file"), userController.setAvatar);
//returns a specific user's avatar
router.get("/avatar/:id", userController.getAvatar);
//deletes user's avatar
router.delete("/avatar", userController.deleteAvatar);
//returns all the users from DB
router.get("/users", userController.getUsers);
//returns a specific user by id
router.get("/users/:id", userController.getById);
//delete user by id
router.delete("/user/:id", userController.deleteUser);
//update user data
router.put("/user", userController.update);

//writes down a new event data into DB
router.post("/event", eventController.addEvent);
//sumbits event
router.put("/event-submit/:eventId", eventController.submitEvent);
//returns events from DB (isSubmited = true - returns submited events
//else returns unsubmited events)
router.get("/events/:isSubmited", eventController.getEvents);
//returns an event of specific user
router.get("/user-events/:userId", eventController.getUserEvents);
//sets event's avatar
//deletes event by id
router.delete("/event/:id", eventController.deleteById);

router.post(
  "/event-avatar/:id",
  upload.single("file"),
  eventController.setAvatar
);
//sends to user invite of to be a participant
router.post("/event-invite", inviteController.eventInvite);
//user sends a proposition of him to be a partificial
router.post("/event-propose", propositionController.eventPropose);
//returns a cpecific event by id
router.get("/event/:id", eventController.getById);
//refresh token request
router.get("/refresh", userController.refresh);

//return an object with proposition data of specific user
router.get("/propositions/:userId", propositionController.getUserPropositions);
//handling proposition accept/reject
//if :accept = true puts a proposer into event's "participants", and then deletes proposition
//if :accept = false just deletes proposition
router.put(
  "/proposition/:propositionId/:accept",
  propositionController.seeProposition
);
//handling invite accept/reject
//if :accept = true puts a proposer into event's "participants", and then deletes proposition
//if :accept = false just deletes proposition
router.put("/invite/:inviteId/:accept", inviteController.seeInvite);

router.get("/invites/:userId", inviteController.getUserInvites);

router.post("/comment", commentController.newComment);

router.get("/comments/:eventId", commentController.getComments);

router.delete("/comment/:commentId", commentController.deleteComment);

router.get("/invite-exists/:eventId", inviteController.eventInviteExists);

router.get("/invite/:receiverId/:eventId", inviteController.getInvite);
// router.get("/activate/:link", userController.activate);

router.get("/events/:userId/:rights", eventController.getEventsWithRights);

router.get("/participants/:eventId", eventController.getParticipants);

router.get(
  "/proposition/:receiverId/:senderId",
  propositionController.getPropsition
);

module.exports = router;
