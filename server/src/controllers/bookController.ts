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

	const bookTitle = req.query.bookTitle as string;

	const filteredBookTitle = bookTitle.replace(/"/g, "''");

	const query = `select * from Books where bookTitle like "%${filteredBookTitle}%";`;
	const [books]: any[] = await db.promise().query(query);

	const returnedBooks: Book[] = [];

	// If we have more than 5 versions of the book stored, then return those books from DB.
	if (books.length > 5) {
		for (const element of books) {
			const { book_id, bookTitle, pageCount, description, bookCover } = element;
			const query = `select Book_Author.author from Books inner join Book_Author on Books.book_id = Book_Author.book_id where Books.book_id = "${book_id}"`;
			let [authors]: any[] = await db.promise().query(query);
			authors = authors.map((ids: { [x: string]: any }) => ids["author"]);

			returnedBooks.push({
				title: bookTitle,
				authors: authors,
				pageCount: pageCount,
				description: description,
				cover: bookCover,
			});
		}

		res.status(HTTPStatus.OK).json(returnedBooks);
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

						query = `select book_id from Books where bookTitle="${editedTitle}" and pageCount="${pageCount}" and description="${editedDescription}" and bookCover="${cover.thumbnail}";`;
						const [row]: any[] = await db.promise().query(query);
						const book_id = row[0].book_id;

						authors.forEach((author: string) => {
							query = `insert ignore into Book_Author(book_id, author) values(${book_id}, '${author}');`;
							db.query(query);
						});

						returnedBooks.push({
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
			res.status(HTTPStatus.OK).json(returnedBooks);
		} else {
			const errMsg = "Retrieving book info failed";
			res.status(HTTPStatus.BAD).json(errMsg);
			throw new Error(errMsg);
		}
	}
});

export { getBook };
