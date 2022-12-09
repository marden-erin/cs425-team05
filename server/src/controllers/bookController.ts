import {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import fetch from 'node-fetch'
import { HTTPStatus } from '../utils/Enums'
import type { Book } from '../utils/Types'
import db from '../model/database'

const getBook =  asyncHandler(async (req : Request, res : Response) => {
    if (!req.query.bookTitle)
    {
        const errMsg = 'Missing book title';
        res.status(HTTPStatus.BAD).json(errMsg);
        throw new Error(errMsg);
    }

    const bookTitle = req.query.bookTitle;

    const query = `select * from books where bookTitle='${bookTitle}';`;
    const [books] : any[] = await db.promise().query(query);

    if (books.length > 0)
    {
        console.log("IN");
        res.status(HTTPStatus.OK).json(books);
    }
    else
    {
        const bookData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${process.env.BOOK_API_KEY}`)
        const formattedBookData = await bookData.json();
    
        if  (formattedBookData.items)
        {
            const firstTenBooks = formattedBookData.items.length >= 10 ? formattedBookData.items.slice(0,10) : formattedBookData.items.slice(0, formattedBookData.items.length)
    
            const filteredTenBooks: Book[] = [];
        
            firstTenBooks.forEach((element: { [x: string]: any }) => {
                const description = element.volumeInfo.description;
                const edited = description.replace(/[']/g, "");

                const query = `insert ignore into books(book_id, bookTitle, author, pageCount, description, bookCover) values(DEFAULT, '${element.volumeInfo.title}', '${element.volumeInfo.authors[0]}', '${element.volumeInfo.pageCount}', '${edited}', '${element.volumeInfo.imageLinks.thumbnail}');`;
                db.query(query);

                filteredTenBooks.push(
                {
                    title : element.volumeInfo.title,
                    authors : element.volumeInfo.authors,
                    pageCount: element.volumeInfo.pageCount,
                    description: element.volumeInfo.description,
                    covers: element.volumeInfo.imageLinks
                }
               )
            });
        
            res.status(HTTPStatus.OK).json(filteredTenBooks);
        }
        else
        {
            const errMsg ='Retrieving book info failed';
            res.status(HTTPStatus.BAD).json(errMsg);
            throw new Error(errMsg);
        }
    }
})


export {
    getBook
}