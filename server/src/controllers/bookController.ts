import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fetch from "node-fetch";
import { HTTPStatus } from "../utils/Enums";
import type { Book } from "../utils/Types";
import db from "../model/database";

const getBook = asyncHandler(async (req: Request, res: Response) => {
	if (!req.query.bookTitle) {
		const errMsg = "Missing book title";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}

	const bookTitle = req.query.bookTitle;

	const query = `select * from Books where bookTitle like '%${bookTitle}%';`;
	const [books]: any[] = await db.promise().query(query);

	// If we have more than 5 versions of the book stored, then return those books from DB.
	if (books.length > 5) {
		res.status(HTTPStatus.OK).json(books);
	} else {
		const bookData = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${process.env.BOOK_API_KEY}`
		);
		const formattedBookData = await bookData.json();

		if (formattedBookData.items) {
			const firstTenBooks =
				formattedBookData.items.length >= 10
					? formattedBookData.items.slice(0, 10)
					: formattedBookData.items.slice(0, formattedBookData.items.length);

			const filteredTenBooks: Book[] = [];

			for (const element of firstTenBooks) {
				const title = element.volumeInfo.title;
				const authors = element.volumeInfo.authors;
				const pageCount = element.volumeInfo.pageCount;
				const description = element.volumeInfo.description;
				const cover = element.volumeInfo.imageLinks;

				if (title && authors && pageCount && description && cover) {
					const editedDescription = description.replace(/"/g, "''");
					const editedTitle = title.replace(/"/g, "''");

					try {
						let query = `insert ignore into Books(book_id, bookTitle, pageCount, description, bookCover) values(DEFAULT, "${editedTitle}", "${pageCount}", "${editedDescription}", "${cover.thumbnail}");`;
						db.query(query);

						query = `select book_id from Books where bookTitle="${editedTitle}";`;
						const [row]: any[] = await db.promise().query(query);
						const book_id = row[0].book_id;

						authors.forEach((author: string) => {
							query = `insert ignore into Book_Author(book_id, author) values(${book_id}, '${author}');`;
							db.query(query);
						});

						filteredTenBooks.push({
							title: element.volumeInfo.title,
							authors: element.volumeInfo.authors,
							pageCount: element.volumeInfo.pageCount,
							description: element.volumeInfo.description,
							cover: element.volumeInfo.imageLinks.thumbnail,
						});
					} catch (err: any) {
						res.status(HTTPStatus.BAD).json(err.sqlMessage);
						throw new Error(err);
					}
				}
			}
			res.status(HTTPStatus.OK).json(filteredTenBooks);
		} else {
			const errMsg = "Retrieving book info failed";
			res.status(HTTPStatus.BAD).json(errMsg);
			throw new Error(errMsg);
		}
	}
});

export { getBook };
