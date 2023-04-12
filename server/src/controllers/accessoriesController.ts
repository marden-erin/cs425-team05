import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";

const getAccessory = asyncHandler(async (req: Request, res: Response) => {
	const { username, id } = req.params;

	if (username && id) {
		try {
			const query = `select * from Accessories where accessory_id=${id}`;
			const [accessory]: any[] = await db.promise().query(query);

			if (accessory.length > 0) {
				res.status(HTTPStatus.OK).json(accessory[0]);
			} else {
				const errMsg = `Error. Accessory does not exist for user`;
				res.status(HTTPStatus.BAD).json(errMsg);
				throw new Error(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err.sqlMessage);
		}
	} else {
		const errMsg = "Error. Missing one or more params (username, id)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const getAllAccessories = asyncHandler(async (req: Request, res: Response) => {
	const { username } = req.params;

	if (username) {
		try {
			let query = `select * from Users where userName='${username}';`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Accessories where user_id=${user_id}`;
			const [accessories]: any[] = await db.promise().query(query);

			res.status(HTTPStatus.OK).json(accessories);
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err.sqlMessage);
		}
	} else {
		const errMsg = "Error. Missing one or more params (username)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const addAccessory = asyncHandler(async (req: Request, res: Response) => {
	const { username, accessoryType, accessoryName } = req.body;

	if (username && accessoryType && accessoryName) {
		try {
			let query = `select * from Users where userName='${username}';`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Accessories where user_id='${user_id}' and accessory_type='${accessoryType}' and accessory_name='${accessoryName}'`;
			const [accessory]: any[] = await db.promise().query(query);

			if (accessory.length > 0) {
				const errMsg = `Error. User already has accessory ${accessoryName} ${accessoryType}`;
				res.status(HTTPStatus.BAD).json(errMsg);
				throw new Error(errMsg);
			} else {
				query = `insert into Accessories (accessory_id, user_id, accessory_type, accessory_name) values(DEFAULT, '${user_id}', '${accessoryType}', '${accessoryName}')`;
				await db.promise().query(query);

				res.status(HTTPStatus.OK).json("Accessory successfully added");
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err.sqlMessage);
		}
		res.status(HTTPStatus.OK);
	} else {
		const errMsg =
			"Error. Missing one or more params (username, accessoryType, accessoryName)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const deleteAccessory = asyncHandler(async (req: Request, res: Response) => {
	const { username, accessoryType, accessoryName } = req.body;

	if (username && accessoryType && accessoryName) {
		try {
			let query = `select * from Users where userName='${username}';`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `delete from Accessories where user_id='${user_id}' and accessory_type='${accessoryType}' and accessory_name='${accessoryName}'`;
			await db.promise().query(query);

			res
				.status(HTTPStatus.OK)
				.json("Accessory successfully removed from user");
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err.sqlMessage);
		}
	} else {
		const errMsg =
			"Error. Missing one ore more params (username, accessoryType, accessoryName)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

export { getAccessory, getAllAccessories, addAccessory, deleteAccessory };
