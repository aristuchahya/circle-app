import { Router } from "express";
import cors from "cors";
import { userController } from "../controllers/user-controller";
import { authController } from "../controllers/auth-controller";
import { threadController } from "../controllers/thread-controller";
import { upload } from "../middlewares/upload-file";
import { authenticate } from "../middlewares/authenticate";
import { replyController } from "../controllers/reply-controller";
import { likeController } from "../controllers/like-controller";

const router = Router();
router.use(cors());

//user
// router.get("/users", authenticate, userController.getAllUsers);
router.get("/user/profile", authenticate, userController.getUserById);
router.post("/users", userController.createUser);
router.patch(
  "/users/profile",
  authenticate,
  upload.single("photoProfile"),
  userController.updateUser
);
router.delete("/users/:id", authenticate, userController.deleteUser);
router.post("/users/follow", authenticate, userController.follow);
router.get("/users/follow/:followingId", authenticate, userController.isFollow);
router.get("/follows", authenticate, userController.findFollow);
router.get("/users", authenticate, userController.findUser);
router.get("/followers/:userId", authenticate, userController.getFollowers);
router.get("/followings/:userId", authenticate, userController.getFollowing);
router.delete("/unfollow", authenticate, userController.unfollowUser);

//auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/check", authenticate, authController.check);

//threads
router.get("/threads", authenticate, threadController.findAll);
router.get("/users/:userId/threads", authenticate, threadController.findThread);
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
router.get("/threads/:id/replies", authenticate, replyController.findAllReply);
router.get("/replies/:id", authenticate, replyController.findReply);
router.delete("/replies/:id", authenticate, replyController.deleteReply);
router.post("/replies/:id", authenticate, replyController.addReply);
router.get(
  "/replies/:threadId/count",
  authenticate,
  replyController.countReplies
);

//like
router.post("/likes", authenticate, likeController.createLike);
router.get("/threads/:id/likes", authenticate, likeController.findAllLike);
router.get("/likes/:threadId/threads", authenticate, likeController.countLike);
router.get("/likes/:id", authenticate, likeController.findLike);
router.delete("/likes/:id", authenticate, likeController.deleteLike);

export default router;
