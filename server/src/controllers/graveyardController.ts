import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";
const getGrave = asyncHandler(async (req: Request, res: Response) => {
	const { graveID } = req.query;

	if (graveID) {
		try {
			let query = `select * from Graveyard where graveyard_id=${graveID}`;
			const [grave]: any[] = await db.promise().query(query);
			const { snail_id } = grave[0];

			query = `select * from Snails where snail_id=${snail_id}`;
			const [snail]: any[] = await db.promise().query(query);

			res.status(HTTPStatus.OK).json(snail[0]);
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = `Error. Missing one or more params (graveID)`;
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const getAllGraves = asyncHandler(async (req: Request, res: Response) => {
	const { userName } = req.params;

	if (userName) {
		const filteredUserName = (userName as string).replace(/"/g, "''");
		try {
			let query = `select * from Users where userName="${filteredUserName}";`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Graveyard where user_id="${user_id}"`;
			const [graves]: any[] = await db.promise().query(query);

			res.status(HTTPStatus.OK).json(graves);
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing username";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const createGrave = asyncHandler(async (req: Request, res: Response) => {
	const { snailName, userName, gravestone } = req.body;

	if (userName && snailName && gravestone) {
		const filteredUserName = userName.replace(/"/g, "''");
		const filteredSnailName = snailName.replace(/"/g, "''");

		try {
			let query = `select * from Users where userName="${filteredUserName}";`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Snails where user_id="${user_id}" and name="${filteredSnailName}"`;
			const [snail]: any[] = await db.promise().query(query);

			if (snail.length > 0) {
				const { snail_id } = snail[0];

				query = `insert into Graveyard (graveyard_id, snail_id, gravestone, user_id) values (default, ${snail_id}, "${gravestone}", ${user_id})`;
				await db.promise().query(query);

				res.status(HTTPStatus.OK).json("Grave successfully created");
			} else {
				const errMsg = `Error. Could not find snail with name ${snailName} for user`;
				res.status(HTTPStatus.BAD).json(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg =
			"Error. Missing one or more params (snailName, userName, gravestone)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const updateGrave = asyncHandler(async (req: Request, res: Response) => {
	const { graveyard_id, gravestone, grave_type } = req.body;

	if (graveyard_id && gravestone && grave_type) {
		const filteredGravestone = gravestone.replace(/"/g, "''");
		try {
			const query = `update Graveyard set gravestone="${filteredGravestone}", grave_type=${grave_type} where graveyard_id=${graveyard_id}`;
			await db.promise().query(query);

			res.status(HTTPStatus.OK).json("Successfully updated grave");
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg =
			"Error. Missing one or more params (graveyard_id, gravestone, grave_type)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const deleteGrave = asyncHandler(async (req: Request, res: Response) => {
	const { graveyard_id } = req.body;

	if (graveyard_id) {
		try {
			let query = `select * from Graveyard where graveyard_id=${graveyard_id}`;
			const [grave]: any[] = await db.promise().query(query);

			if (grave.length > 0) {
				query = `delete from Graveyard where graveyard_id=${graveyard_id}`;
				await db.promise().query(query);

				res.status(HTTPStatus.OK).json("Successfully deleted grave");
			} else {
				res
					.status(HTTPStatus.BAD)
					.json(`Error. Grave with id ${graveyard_id} does not exist`);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing one or more params (graveyard_id)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

export { getGrave, getAllGraves, createGrave, updateGrave, deleteGrave };
