import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";
import { Book } from "../utils/Types";

const getGoal = asyncHandler(async (req: Request, res: Response) => {
	console.log("get goal");
});

const getAllGoals = asyncHandler(async (req: Request, res: Response) => {
	console.log("get all goals");
});

const addGoal = asyncHandler(async (req: Request, res: Response) => {
	const { book, userName, notes } = req.body;
	if (book && userName) {
		const { title, pageCount, cover } = book;
		const filteredUserName = userName.replace(/"/g, "''");
		const filteredTitle = (title as string).replace(/"/g, "''");

		let query = `select * from Users where userName="${filteredUserName}"`;
		const [user]: any[] = await db.promise().query(query);
		const { user_id } = user[0];

		query = `select * from Books where bookTitle="${filteredTitle}" and pageCount="${pageCount}" and bookCover="${cover}"`;
		const [returnedBook]: any[] = await db.promise().query(query);
		const { book_id } = returnedBook[0];

		query = `insert into Goals(goal_id, book_id, user_id, notes) values(DEFAULT, "${book_id}", "${user_id}", "${notes}");`;
		await db.promise().query(query);

		res.status(HTTPStatus.OK).json("Successfully added goal");
	} else {
		const errMsg =
			"Error, Missing one or more required params (book, userName)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const updateGoal = asyncHandler(async (req: Request, res: Response) => {
	console.log("update goal");
});

const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
	console.log("in delete goal");
});

export { getGoal, getAllGoals, addGoal, updateGoal, deleteGoal };
