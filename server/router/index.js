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

router.post(
  "/registration",
  body("login").isLength({ min: 3, max: 32 }),
  body("email").isEmail(),
  //todo: fix date validation
  body("birthday").isLength({ min: 1, max: 32 }),
  body("cell").isMobilePhone(),
  body("city").isLength({ min: 2 }),
  body("gender").notEmpty(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
// router.post('/registration', userController.registration)
router.post("/login", userController.loginF);
router.post("/logout", userController.logout);
router.post("/events", eventController.addEvent);
router.get("/events", eventController.getAllEvents);
router.post(
  "/event-avatar/:name",
  upload.single("file"),
  eventController.setAvatar
);
router.post("/events-find", eventController.findEvent);
router.post("/event-invite", userController.eventInvite);
router.get("/user-events/:creatorId", eventController.getUserEvents);
router.post("/avatar", upload.single("file"), userController.setAvatar);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getById);
router.get("/event/:id", eventController.getById);
router.delete("/avatar", userController.deleteAvatar);
router.delete("/user/:id", userController.deleteUser);
router.put("/user", userController.update);

module.exports = router;
