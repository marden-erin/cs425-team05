import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";
const getGrave = asyncHandler(async (req: Request, res: Response) => {
	console.log("in get grave");
	res.status(HTTPStatus.OK).json("in get grave");
});

const getAllGraves = asyncHandler(async (req: Request, res: Response) => {
	console.log("in get all graves");
	res.status(HTTPStatus.OK).json("in get all graves");
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
	console.log("in update grave");
	res.status(HTTPStatus.OK).json("in update grave");
});

const deleteGrave = asyncHandler(async (req: Request, res: Response) => {
	console.log("in delete grave");
	res.status(HTTPStatus.OK).json("in delete grave");
});

export { getGrave, getAllGraves, createGrave, updateGrave, deleteGrave };
