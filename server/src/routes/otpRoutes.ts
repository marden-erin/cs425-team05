import express from "express";

import {
	createOTP,
    validateOTP
} from "../controllers/otpController";

const otpRouter = express.Router();

otpRouter.post("/", createOTP);

otpRouter.get("/", validateOTP);

export default otpRouter;