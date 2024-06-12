"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user-controller");
var auth_controller_1 = require("../controllers/auth-controller");
var thread_controller_1 = require("../controllers/thread-controller");
var upload_file_1 = require("../middlewares/upload-file");
var authenticate_1 = require("../middlewares/authenticate");
var reply_controller_1 = require("../controllers/reply-controller");
var like_controller_1 = require("../controllers/like-controller");
var router = (0, express_1.Router)();
//user
// router.get("/users", authenticate, userController.getAllUsers);
router.get("/user/profile", authenticate_1.authenticate, user_controller_1.userController.getUserById);
router.post("/users", user_controller_1.userController.createUser);
router.patch("/users/profile", authenticate_1.authenticate, upload_file_1.upload.single("photoProfile"), user_controller_1.userController.updateUser);
router.delete("/users/:id", authenticate_1.authenticate, user_controller_1.userController.deleteUser);
router.post("/users/follow", authenticate_1.authenticate, user_controller_1.userController.follow);
router.get("/users/follow/:followingId", authenticate_1.authenticate, user_controller_1.userController.isFollow);
router.get("/follows", authenticate_1.authenticate, user_controller_1.userController.findFollow);
router.get("/users", authenticate_1.authenticate, user_controller_1.userController.findUser);
//auth
router.post("/auth/login", auth_controller_1.authController.login);
router.post("/auth/register", auth_controller_1.authController.register);
router.post("/auth/check", authenticate_1.authenticate, auth_controller_1.authController.check);
//threads
router.get("/threads", authenticate_1.authenticate, thread_controller_1.threadController.findAll);
router.get("/users/:userId/threads", authenticate_1.authenticate, thread_controller_1.threadController.findThread);
router.post("/threads", authenticate_1.authenticate, upload_file_1.upload.single("image"), thread_controller_1.threadController.create);
router.patch("/threads/:id", authenticate_1.authenticate, upload_file_1.upload.single("image"), thread_controller_1.threadController.update);
router.delete("/threads/:id", authenticate_1.authenticate, thread_controller_1.threadController.deleteThread);
//reply
router.post("/replies", authenticate_1.authenticate, reply_controller_1.replyController.createReply);
router.get("/threads/:id/replies", authenticate_1.authenticate, reply_controller_1.replyController.findAllReply);
router.get("/replies/:id", authenticate_1.authenticate, reply_controller_1.replyController.findReply);
router.delete("/replies/:id", authenticate_1.authenticate, reply_controller_1.replyController.deleteReply);
router.post("/replies/:id", authenticate_1.authenticate, reply_controller_1.replyController.addReply);
router.get("/replies/:threadId/count", authenticate_1.authenticate, reply_controller_1.replyController.countReplies);
//like
router.post("/likes", authenticate_1.authenticate, like_controller_1.likeController.createLike);
router.get("/likes", authenticate_1.authenticate, like_controller_1.likeController.findAllLike);
router.get("likes/:id", authenticate_1.authenticate, like_controller_1.likeController.findLike);
router.delete("/likes/:id", authenticate_1.authenticate, like_controller_1.likeController.deleteLike);
exports.default = router;
//# sourceMappingURL=users-routes.js.map