import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";
import { Book } from "../utils/Types";

const getBookFromCluster = asyncHandler(async (req: Request, res: Response) => {
	const { clusterName, userName, title, pageNumbers, bookCoverLink } =
		req.query;

	if (clusterName && userName && title && pageNumbers && bookCoverLink) {
		const filteredClusterName = (clusterName as string).replace(/"/g, "''");
		const filteredUserName = (userName as string).replace(/"/g, "''");
		const filteredTitle = (title as string).replace(/"/g, "''");

		try {
			let query = `select * from Users where userName="${filteredUserName}"`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Clusters where clusterName="${filteredClusterName}" and user_id="${user_id}"`;
			const [cluster]: any[] = await db.promise().query(query);
			const { cluster_id } = cluster[0];

			query = `select book_id from Cluster_Book where cluster_id="${cluster_id}" and user_id="${user_id}";`;
			let [bookIds]: any[] = await db.promise().query(query);
			bookIds = bookIds.map((ids: { [x: string]: any }) => ids["book_id"]);

			query = `select * from Books where bookTitle="${filteredTitle}" and pageCount="${pageNumbers}" and bookCover="${bookCoverLink}"`;
			const [book]: any[] = await db.promise().query(query);
			const { book_id, bookTitle, pageCount, description, bookCover } = book[0];

			if (bookIds.includes(book_id)) {
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

				res.status(HTTPStatus.OK).json(foundBook);
				return;
			}

			throw new Error(`Error, book "${title}" may not be in cluster`);
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

const addBookToCluster = asyncHandler(async (req: Request, res: Response) => {
	const { clusterName, userName, bookTitle, pageCount, bookCover } = req.body;

	if (clusterName && userName && bookTitle) {
		const filteredClusterName = clusterName.replace(/"/g, "''");
		const filteredUserName = userName.replace(/"/g, "''");
		const filteredBookTitle = bookTitle.replace(/"/g, "''");
		const filteredBookCover = bookCover.replace(/"/g, "''");

		try {
			let query = `select * from Users where userName="${filteredUserName}";`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Books where bookTitle="${filteredBookTitle}" and pageCount="${pageCount}" and bookCover="${filteredBookCover}";`;
			const [book]: any[] = await db.promise().query(query);
			const { book_id } = book[0];

			query = `select * from Clusters where clusterName="${filteredClusterName}" and user_id="${user_id}";`;
			const [cluster]: any[] = await db.promise().query(query);
			const { cluster_id } = cluster[0];

			query = `select * from Cluster_Book where cluster_id="${cluster_id}" and book_id= "${book_id}"`;
			const [duplicateBooks]: any[] = await db.promise().query(query);

			if (duplicateBooks.length > 0) {
				const errMsg = "Error. Book is already in cluster";
				res.status(HTTPStatus.BAD).json(errMsg);
				throw new Error(errMsg);
			} else {
				query = `insert into Cluster_Book (cluster_id, book_id, user_id) values("${cluster_id}", "${book_id}", "${user_id}");`;
				await db.promise().query(query);

				res.status(HTTPStatus.OK).json("Successfully added book to cluster");
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

const updateBookInCluster = asyncHandler(
	async (req: Request, res: Response) => {
		//call book api to update book info
	}
);

const deleteBookFromCluster = asyncHandler(
	async (req: Request, res: Response) => {
		const { clusterName, userName, bookTitle, pageCount, bookCover } = req.body;

		if (clusterName && userName && bookTitle) {
			const filteredClusterName = clusterName.replace(/"/g, "''");
			const filteredUserName = userName.replace(/"/g, "''");
			const filteredBookTitle = bookTitle.replace(/"/g, "''");
			const filteredBookCover = bookCover.replace(/"/g, "''");

			try {
				let query = `select * from Users where userName="${filteredUserName}";`;
				const [user]: any[] = await db.promise().query(query);
				const { user_id } = user[0];

				query = `select * from Books where bookTitle="${filteredBookTitle}" and pageCount="${pageCount}" and bookCover="${filteredBookCover}";`;
				const [book]: any[] = await db.promise().query(query);
				const { book_id } = book[0];

				query = `select * from Clusters where clusterName="${filteredClusterName}" and user_id="${user_id}";`;
				const [cluster]: any[] = await db.promise().query(query);
				const { cluster_id } = cluster[0];

				query = `select * from Cluster_Book where cluster_id="${cluster_id}" and book_id= "${book_id}"`;
				const [bookFoundInCluster]: any[] = await db.promise().query(query);

				if (bookFoundInCluster.length > 0) {
					query = `delete from Cluster_Book where cluster_id="${cluster_id}" and user_id="${user_id}" and book_id=${book_id}`;
					await db.promise().query(query);

					res
						.status(HTTPStatus.OK)
						.json("Successfully deleted book from cluster");
				} else {
					const errMsg = `Error. Book "${bookTitle}" is not found in cluster`;
					res.status(HTTPStatus.BAD).json(errMsg);
					throw new Error(errMsg);
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
	}
);

export {
	getBookFromCluster,
	addBookToCluster,
	updateBookInCluster,
	deleteBookFromCluster,
};
