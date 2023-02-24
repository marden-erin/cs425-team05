import express from "express";
import { registerUser, authenticateUser, getUserInformation } from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/", getUserInformation);
userRouter.post("/", registerUser);
userRouter.post("/login", authenticateUser);

export default userRouter;