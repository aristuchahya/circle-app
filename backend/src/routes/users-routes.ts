import { Router } from "express";
import { userController } from "../controllers/user-controller";
import { authController } from "../controllers/auth-controller";
import { threadController } from "../controllers/thread-controller";
import { upload } from "../middlewares/upload-file";
import { authenticate } from "../middlewares/authenticate";
import { replyController } from "../controllers/reply-controller";
import { likeController } from "../controllers/like-controller";

const router = Router();

//user
router.get("/users", authenticate, userController.getAllUsers);
router.get("/users/:id", authenticate, userController.getUserById);
router.post("/users", userController.createUser);
router.patch(
  "/users/:id",
  authenticate,
  upload.single("photoProfile"),
  userController.updateUser
);
router.delete("/users/:id", authenticate, userController.deleteUser);

router.post("/users/follow", authenticate, userController.follow);
router.get("/users/follow/:followingId", authenticate, userController.isFollow);
router.get("/follows", authenticate, userController.findFollow);
//auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/check", authenticate, authController.check);

//threads
router.get("/threads", authenticate, threadController.findAll);
router.get("/threads/:id", authenticate, threadController.findThread);
router.post(
  "/threads",
  authenticate,
  upload.single("image"),
  threadController.create
);
router.patch(
  "/threads/:id",
  authenticate,
  upload.single("image"),
  threadController.update
);
router.delete("/threads/:id", authenticate, threadController.deleteThread);

//reply
router.post("/replies", authenticate, replyController.createReply);
router.get("/replies", authenticate, replyController.findAllReply);
router.get("/replies/:id", authenticate, replyController.findReply);
router.delete("/replies/:id", authenticate, replyController.deleteReply);

//like
router.post("/likes", authenticate, likeController.createLike);
router.get("/likes", authenticate, likeController.findAllLike);
router.get("likes/:id", authenticate, likeController.findLike);
router.delete("/likes/:id", authenticate, likeController.deleteLike);

export default router;
