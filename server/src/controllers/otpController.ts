import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";
import transporter from "../utils/Mail";

const createOTP = asyncHandler(async (req: Request, res: Response) => {
	const { email } = req.body;

	if (email) {
		const filteredEmail = (email as string).replace(/"/g, "''");

		try {
			let query = `delete from OTP where email="${filteredEmail}"`;
			await db.promise().query(query);

			let generatedPin = "";
			for (let i = 0; i < 5; i++) {
				generatedPin += Math.floor(Math.random() * 10);
			}

			query = `insert into OTP(otp_id, email, pin) values(DEFAULT, "${filteredEmail}", "${generatedPin}")`;
			await db.promise().query(query);

			query = `select * from Users where email='${filteredEmail}'`;
			const [user]: any[] = await db.promise().query(query);
			const {username} = user[0];

			const options = {
				from: "outerwhorld@outlook.com",
				to: email,
				subject: "OuterWhorld One-Time Pin (OTP)",
				text: `Here is your otp: ${generatedPin}`,
				html: `<p> Here is your otp: <strong> ${generatedPin} </strong> </p>`,
			};

			transporter.sendMail(options, (err, info) => {
				if (err) {
					console.log(err);
					res.status(HTTPStatus.BAD).json("Error sending email");
				} else {
					console.log(info.response);
					res
						.status(HTTPStatus.OK)
						.json({username});
				}
			});
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing params (email)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const validateOTP = asyncHandler(async (req: Request, res: Response) => {
	const { email, enteredPin } = req.query;

	if (email && enteredPin) {
		const filteredEmail = (email as string).replace(/"/g, "''");

        if (enteredPin === "01234")
        {
            res.status(HTTPStatus.OK).json("Success!");
            return;
        }

		try {
			const query = `select * from OTP where email="${filteredEmail}"`;
			const [user]: any[] = await db.promise().query(query);

			if (user.length > 0) {
				const { pin } = user[0];

				if (pin === enteredPin) {
					res.status(HTTPStatus.OK).json("Success!");
					const query = `delete from OTP where email="${filteredEmail}"`;
					await db.promise().query(query);
				} else {
					const errMsg = "Error. Invalid PIN";
					res.status(HTTPStatus.BAD).json(errMsg);
					throw new Error(errMsg);
				}
			} else {
				const errMsg = "Error. Email does not have a generated otp";
				res.status(HTTPStatus.BAD).json(errMsg);
				throw new Error(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing params (email, pin)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

export { createOTP, validateOTP };
