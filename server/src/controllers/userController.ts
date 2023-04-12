import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	if (name && email && password) {
		try {
			const filteredName = name.replace(/"/g, "''");
			let query = `select * from Users where username="${name}"`;
			let [user]: any[] = await db.promise().query(query);
			if (user.length > 0) {
				const errMsg = `Error: User with name ${name} already exists.`;
				res.status(HTTPStatus.BAD).json(errMsg);
				throw new Error(errMsg);
			}
			query = `select * from Users where email="${email}"`;
			[user] = await db.promise().query(query);
			if (user.length > 0) {
				const errMsg = `Error: Account with email already exists.`;
				res.status(HTTPStatus.BAD).json(errMsg);
				throw new Error(errMsg);
			}

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			query = `insert into Users(user_id, username, hashed_password, email, last_login) values (DEFAULT, "${filteredName}", '${hashedPassword}', '${email}', ${null});`;
			await db.promise().query(query);

			res.status(HTTPStatus.OK).json("Account successfully created");
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing params (name, email, password)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
	res.status(HTTPStatus.OK).json("In register user");
});

const authenticateUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (email && password) {
		try {
			const query = `Select * from Users where email="${email}"`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id, username, hashed_password } = user[0];

			if (await bcrypt.compare(password, hashed_password)) {
				const token = jwt.sign(
					{ user_id, username },
					process.env.JWT_SECRET as string,
					{
						expiresIn: "1d",
					}
				);
				const userData = { username, token };
				res.status(HTTPStatus.OK).json(userData);
			} else {
				console.log("IN2");
				const errMsg = "Error. Incorrect email and/or password";
				res.status(HTTPStatus.BAD).json(errMsg);
				throw new Error(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing params (email, password)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const getUserInformation = asyncHandler(async (req: Request, res: Response) => {
	const { userName } = req.params;

	if (userName) {
		const filteredUserName = (userName as string).replace(/"/g, "''");
		try {
			const query = `select * from Users where userName="${filteredUserName}";`;
			const [user]: any[] = await db.promise().query(query);

			res.status(HTTPStatus.OK).json(user[0]);
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing params (userName)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const signOutUser = asyncHandler(async (req: Request, res: Response) => {
	const { userName, signOutTime } = req.body;

	if (userName && signOutTime) {
		const filteredUserName = (userName as string).replace(/"/g, "''");

		const query = `update Users set last_login="${signOutTime}" where userName="${filteredUserName}"`;
		await db.promise().query(query);

		res.status(HTTPStatus.OK).json("Successfully signed out user");
	} else {
		const errMsg = "Error. Missing params (userName, signOutTime)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const updateUserInformation = asyncHandler(async (req: Request, res: Response) => {
	const { userName, currency } = req.body;

	if (userName && currency) {
		const filteredUserName = (userName as string).replace(/"/g, "''");

		const query = `update Users set currency="${currency}" where userName="${filteredUserName}"`;
		await db.promise().query(query);

		res.status(HTTPStatus.OK).json("Successfully updated user information");
	} else {
		const errMsg = "Error. Missing params (userName, currency)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

export { registerUser, authenticateUser, getUserInformation, signOutUser, updateUserInformation };
