import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";

const getSnail = asyncHandler(async (req: Request, res: Response) => {
	const { userName } = req.query;

	if (userName) {
		const filteredUserName = (userName as string).replace(/"/g, "''");

		try {
			let query = `select * from Users where userName="${filteredUserName}";`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Snails where user_id="${user_id}"`;
			const [snail]: any[] = await db.promise().query(query);

			if (snail.length > 0) {
				const { name, color } = snail[0];
				res.status(HTTPStatus.OK).json({ name, color });
			} else {
				const errMsg = "Error. User does not have a snail";
				res.status(HTTPStatus.BAD).json(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing one or more params";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const updateSnail = asyncHandler(async (req: Request, res: Response) => {
	const { userName, snailName, snailColor } = req.body;

	if (userName && snailName && snailColor) {
		const filteredUserName = userName.replace(/"/g, "''");
		const filteredSnailName = snailName.replace(/"/g, "''");

		try {
			let query = `select * from Users where userName='${filteredUserName}';`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Snails where user_id="${user_id}"`;
			const [snail]: any[] = await db.promise().query(query);

			if (snail.length > 0) {
				const { snail_id } = snail[0];
				query = `update Snails set name="${filteredSnailName}", color="${snailColor}" where snail_id="${snail_id}"`;
				await db.promise().query(query);

				res.status(HTTPStatus.OK).json("Snail successfully updated");
			} else {
				const errMsg = "Error. User does not have a snail";
				res.status(HTTPStatus.BAD).json(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing one or more params";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const createSnail = asyncHandler(async (req: Request, res: Response) => {
	const { userName, snailName, snailColor } = req.body;

	if (userName && snailName && snailColor) {
		const filteredUserName = userName.replace(/"/g, "''");
		const filteredSnailName = snailName.replace(/"/g, "''");

		try {
			let query = `select * from Users where userName='${filteredUserName}';`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Snails where user_id="${user_id}"`;
			const [snail]: any[] = await db.promise().query(query);

			if (snail.length == 0) {
				query = `insert into Snails (snail_id, user_id, color, name) values(default, ${user_id}, "${snailColor}", "${filteredSnailName}")`;
				await db.promise().query(query);

				res.status(HTTPStatus.OK).json("Snail successfully created");
			} else {
				const errMsg = "Error. User already has a snail";
				res.status(HTTPStatus.BAD).json(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing one or more params";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const deleteSnail = asyncHandler(async (req: Request, res: Response) => {
	const { userName } = req.body;

	if (userName) {
		const filteredUserName = (userName as string).replace(/"/g, "''");

		try {
			let query = `select * from Users where userName="${filteredUserName}";`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Snails where user_id="${user_id}"`;
			const [snail]: any[] = await db.promise().query(query);

			if (snail.length > 0) {
				query = `delete from Snails where user_id="${user_id}"`;
				const [res]: any[] = await db.promise().query(query);

				res.status(HTTPStatus.OK).json("Successfully deleted snail");
			} else {
				const errMsg = "Error. User does not have a snail";
				res.status(HTTPStatus.BAD).json(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing one or more params";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

export { getSnail, updateSnail, createSnail, deleteSnail };
