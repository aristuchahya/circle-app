import { Router } from "express";
import { userController } from "../controllers/user-controller";
import { authController } from "../controllers/auth-controller";

const router = Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

//auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);

export default router;
