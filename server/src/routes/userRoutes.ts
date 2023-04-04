import express from "express";
import { registerUser, authenticateUser, getUserInformation, signOutUser, updateUserInformation } from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/:userName", getUserInformation);
userRouter.post("/", registerUser);
userRouter.post("/login", authenticateUser);
userRouter.put("/", signOutUser)
userRouter.put("/login", updateUserInformation)

export default userRouter;