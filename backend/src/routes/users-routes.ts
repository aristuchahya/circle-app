import { Router } from "express";
import { userController } from "../controllers/user-controller";
import { authController } from "../controllers/auth-controller";
import { threadController } from "../controllers/thread-controller";
import { upload } from "../middlewares/upload-file";

const router = Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

//auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);

//threads
router.get("/threads", threadController.findAll);
router.get("/threads/:id", threadController.findThread);
router.post("/threads", upload.single("image"), threadController.create);
router.put("/threads/:id", upload.single("image"), threadController.update);
router.delete("/threads/:id", threadController.deleteThread);

export default router;
