import express from "express";
import { registerUser, authenticateUser, getUserInformation, signOutUser, updateUserInformation, checkIfAlreadyRegistered } from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/", checkIfAlreadyRegistered);
userRouter.get("/:userName", getUserInformation);
userRouter.post("/", registerUser);
userRouter.post("/login", authenticateUser);
userRouter.put("/", signOutUser)
userRouter.put("/login", updateUserInformation)

export default userRouter;