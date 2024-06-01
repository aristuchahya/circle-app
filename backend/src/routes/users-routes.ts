import { Router } from "express";
import { userController } from "../controllers/user-controller";
import { authController } from "../controllers/auth-controller";
import { threadController } from "../controllers/thread-controller";
import { upload } from "../middlewares/upload-file";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.get("/users", authenticate, userController.getAllUsers);
router.get("/users/:id", authenticate, userController.getUserById);
router.post("/users", userController.createUser);
router.put(
  "/users/:id",
  authenticate,
  upload.single("photoProfile"),
  userController.updateUser
);
router.delete("/users/:id", authenticate, userController.deleteUser);

//auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);

//threads
router.get("/threads", authenticate, threadController.findAll);
router.get("/threads/:id", authenticate, threadController.findThread);
router.post(
  "/threads",
  authenticate,
  upload.single("image"),
  threadController.create
);
router.put(
  "/threads/:id",
  authenticate,
  upload.single("image"),
  threadController.update
);
router.delete("/threads/:id", authenticate, threadController.deleteThread);

export default router;
