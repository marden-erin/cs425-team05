import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";
import { Book } from "../utils/Types";

const getGoal = asyncHandler(async (req: Request, res: Response) => {
	const { userName, goalID } = req.params;

	if (userName && goalID) {
		let query = `select * from Goals where goal_id="${goalID}"`;
		const [goal]: any[] = await db.promise().query(query);
		if (goal.length > 0) {
			const {
				goal_id,
				book_id,
				notes,
				pageCount: goal_pageCount,
				deadline,
				completed
			} = goal[0];

			query = `select * from Books where book_id=${book_id}`;
			const [book]: any[] = await db.promise().query(query);
			const { bookTitle, pageCount, description, bookCover } = book[0];

			query = `select Book_Author.author from Books inner join Book_Author on Books.book_id = Book_Author.book_id where Books.book_id = "${book_id}"`;
			let [authors]: any[] = await db.promise().query(query);
			authors = authors.map((ids: { [x: string]: any }) => ids["author"]);

			const foundBook: Book = {
				title: bookTitle,
				authors,
				pageCount,
				description,
				cover: bookCover,
			};

			const returnedObject = {
				goal_id,
				notes,
				goal_pageCount,
				deadline,
				completed,
				foundBook,
			};

			res.status(HTTPStatus.OK).json(returnedObject);
		} else {
			const errMsg = `Error. Goal with ID ${goalID} does not exist`;
			res.status(HTTPStatus.BAD).json(errMsg);
			throw new Error(errMsg);
		}
	} else {
		const errMsg =
			"Error, Missing one or more required params (userName, goalID)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const getAllGoals = asyncHandler(async (req: Request, res: Response) => {
	const { userName } = req.params;

	if (userName) {
		const filteredUserName = userName.replace(/"/g, "''");

		let query = `select * from Users where userName="${filteredUserName}"`;
		const [user]: any[] = await db.promise().query(query);
		const { user_id } = user[0];

		query = `select * from Goals where user_id="${user_id}"`;
		const [goals]: any[] = await db.promise().query(query);

		const response: any[] = [];

		for (const goal of goals) {
			const {
				goal_id,
				book_id,
				notes,
				pageCount: goal_pageCount,
				deadline,
				completed
			} = goal;

			query = `select * from Books where book_id=${book_id}`;
			const [book]: any[] = await db.promise().query(query);
			const { bookTitle, pageCount, description, bookCover } = book[0];

			query = `select Book_Author.author from Books inner join Book_Author on Books.book_id = Book_Author.book_id where Books.book_id = "${book_id}"`;
			let [authors]: any[] = await db.promise().query(query);
			authors = authors.map((ids: { [x: string]: any }) => ids["author"]);

			const foundBook: Book = {
				title: bookTitle,
				authors,
				pageCount,
				description,
				cover: bookCover,
			};

			const returnedObject = {
				goal_id,
				notes,
				goal_pageCount,
				deadline,
				completed,
				foundBook,
			};

			response.push(returnedObject);
		}
		res.status(HTTPStatus.OK).json(response);
	} else {
		const errMsg = "Error, Missing one or more required params (userName)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const addGoal = asyncHandler(async (req: Request, res: Response) => {
	const {
		book,
		userName,
		notes,
		pageCount: goalPageCount,
		deadline,
	} = req.body;
	if (book && userName && deadline) {
		const { title, pageCount, cover } = book;
		const filteredUserName = userName.replace(/"/g, "''");
		const filteredTitle = (title as string).replace(/"/g, "''");

		let query = `select * from Users where userName="${filteredUserName}"`;
		const [user]: any[] = await db.promise().query(query);
		const { user_id } = user[0];
		query = `select * from Books where bookTitle="${filteredTitle}" and pageCount="${pageCount}" and bookCover="${cover}"`;
		const [returnedBook]: any[] = await db.promise().query(query);
		const { book_id } = returnedBook[0];

		query = `insert into Goals(goal_id, book_id, user_id, notes, pageCount, deadline, completed) values(DEFAULT, "${book_id}", "${user_id}", "${notes}", "${goalPageCount}", "${deadline}", "${false}");`;
		await db.promise().query(query);

		res.status(HTTPStatus.OK).json("Successfully added goal");
	} else {
		const errMsg =
			"Error, Missing one or more required params (book, userName, pageCount, deadline)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const updateGoal = asyncHandler(async (req: Request, res: Response) => {
	const { goalID, notes, pageCount, completed } = req.body;

	if (goalID && notes && pageCount) {
		const query = `update Goals set notes="${notes}", pageCount="${pageCount}", completed=${completed} where goal_id=${goalID}`;
		await db.promise().query(query);

		res.status(HTTPStatus.OK).json("Successfully updated goal");
	} else {
		const errMsg =
			"Error, Missing one or more required params (goal id, notes, pageCount)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
	const { goalID } = req.body;

	if (goalID) {
		const query = `delete from Goals where goal_id="${goalID}"`;
		await db.promise().query(query);

		res.status(HTTPStatus.OK).json("Goal successfully deleted");
	} else {
		const errMsg = "Error, Missing one or more required params (goal id)";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

export { getGoal, getAllGoals, addGoal, updateGoal, deleteGoal };
