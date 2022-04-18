const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const eventController = require("../controllers/event-controller");
const multer = require("multer");
const path = require("path");

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
router.post("/login", userController.loginF);
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
router.post("/events", eventController.addEvent);
//sumbits event
router.post("/event-submit/:eventId", eventController.submitEvent);
//returns all the existing events from DB
router.get("/events", eventController.getAllEvents);
//returns all the submited events from DB
router.get("/events-submited", eventController.getSubmitedEvents);
//returns all the submited events from DB
router.get("/events-unsubmited", eventController.getUnsubmitedEvents);
//sets event's avatar
router.post(
  "/event-avatar/:id",
  upload.single("file"),
  eventController.setAvatar
);
//returns an event according to specific parameters
router.post("/events-find", eventController.findEvent);
//sends to user invite of to be a participant
router.post("/event-invite", userController.eventInvite);
//sends to user invite of to be a participant
router.post("/event-invite-remove/:userId", userController.removeInvite);
//returns an event of specific user
router.get("/user-events/:creatorId", eventController.getUserEvents);
//returns a cpecific event by id
router.get("/event/:id", eventController.getById);
//deletes event by id
router.delete("/event/:id", eventController.deleteById);
//refresh token request
router.get("/refresh", userController.refresh);

// router.get("/activate/:link", userController.activate);

module.exports = router;
