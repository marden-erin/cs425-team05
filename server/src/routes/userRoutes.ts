import express from "express";
import { registerUser, authenticateUser, getUserInformation, signOutUser } from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/:userName", getUserInformation);
userRouter.post("/", registerUser);
userRouter.post("/login", authenticateUser);
userRouter.put("/", signOutUser)

export default userRouter;