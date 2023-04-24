import NodeMailer from "nodemailer";
import * as dotenv from "dotenv";

const transporter = NodeMailer.createTransport({
	service: "hotmail",
	auth: {
		user: "outerwhorld@outlook.com",
		pass: process.env.DB_PASSWORD,
	},
});

export default transporter;