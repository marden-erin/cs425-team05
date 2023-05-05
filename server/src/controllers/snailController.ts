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

			query = `select * from Snails where user_id="${user_id}" and is_active=true`;
			const [snail]: any[] = await db.promise().query(query);

			if (snail.length > 0) {
				const {
					name,
					color,
					health,
					date_created,
					date_died,
					goals_completed,
					goals_failed,
					accessories,
					is_active,
				} = snail[0];
				res.status(HTTPStatus.OK).json({
					name,
					color,
					health,
					date_created,
					date_died,
					goals_completed,
					goals_failed,
					accessories,
					is_active,
				});
			} else {
				const errMsg = "Error. User does not have a snail";
				res.status(HTTPStatus.BAD).json(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing one or more params (userName)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const getAllSnails = asyncHandler(async (req: Request, res: Response) => {
	const { userName } = req.query;

	if (userName) {
		const filteredUserName = (userName as string).replace(/"/g, "''");

		try {
			let query = `select * from Users where userName="${filteredUserName}";`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Snails where user_id="${user_id}"`;
			const [snails]: any[] = await db.promise().query(query);

			if (snails.length > 0) {
				res.status(HTTPStatus.OK).json(snails);
			} else {
				const errMsg = "Error. User does not have any snails";
				res.status(HTTPStatus.BAD).json(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing one or more params (userName)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const updateSnail = asyncHandler(async (req: Request, res: Response) => {
	const {
		userName,
		snailName,
		snailColor,
		snailHealth,
		deathDate,
		goalsCompleted,
		goalsFailed,
		accessories,
		isActive,
	} = req.body;

	if (userName && snailName && snailColor) {
		const filteredUserName = userName.replace(/"/g, "''");
		const filteredSnailName = snailName.replace(/"/g, "''");

		try {
			let query = `select * from Users where userName='${filteredUserName}';`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Snails where user_id="${user_id}" and name="${filteredSnailName}"`;
			const [snail]: any[] = await db.promise().query(query);

			if (snail.length > 0) {
				const { snail_id } = snail[0];
				query = `update Snails set name="${filteredSnailName}", color="${snailColor}", health="${snailHealth}", date_died="${deathDate}", goals_completed="${goalsCompleted}", goals_failed="${goalsFailed}", accessories='${accessories}', is_active=${isActive} where snail_id="${snail_id}"`;
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
	const { userName, snailName, snailColor, date, isActive } = req.body;

	if (userName && snailName && snailColor && date) {
		const filteredUserName = userName.replace(/"/g, "''");
		const filteredSnailName = snailName.replace(/"/g, "''");

		try {
			let query = `select * from Users where userName='${filteredUserName}';`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Snails where user_id="${user_id}" and name="${filteredSnailName}"`;
			const [snail]: any[] = await db.promise().query(query);

			if (snail.length === 0) {
				query = `insert into Snails (snail_id, user_id, color, name, health, date_created, date_died, goals_completed, goals_failed, accessories, is_active) values(default, ${user_id}, "${snailColor}", "${filteredSnailName}", "${3}", "${date}", ${null}, "${0}", "${0}", JSON_OBJECT(), ${isActive})`;
				await db.promise().query(query);

				res.status(HTTPStatus.OK).json("Snail successfully created");
			} else {
				const errMsg = `Error. Snail with name ${snailName} already exists for user`;
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
	const { userName, snailName } = req.body;

	if (userName && snailName) {
		const filteredUserName = (userName as string).replace(/"/g, "''");
		const filteredSnailName = snailName.replace(/"/g, "''");
		try {
			let query = `select * from Users where userName="${filteredUserName}";`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Snails where user_id="${user_id}"`;
			const [snail]: any[] = await db.promise().query(query);

			if (snail.length > 0) {
				query = `delete from Snails where user_id="${user_id}" and name="${filteredSnailName}"`;
				await db.promise().query(query);

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

export { getSnail, updateSnail, createSnail, deleteSnail, getAllSnails };
