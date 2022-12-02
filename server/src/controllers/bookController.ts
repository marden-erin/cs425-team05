import {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import fetch from 'node-fetch'
import { HTTPStatus } from '../utils/Enums'
import type { Book } from '../utils/Types'


const getBook =  asyncHandler(async (req : Request ,res : Response) => {
    if (!req.params.bookTitle)
    {
        res.status(HTTPStatus.BAD)
        throw new Error('Missing book title')
    }
    
    const bookData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.params.bookTitle}&key=${process.env.BOOK_API_KEY}`)

    const formattedBookData = await bookData.json()

    if  (formattedBookData.items)
    {
        const firstTenBooks = formattedBookData.items.length >= 10 ? formattedBookData.items.slice(0,10) : formattedBookData.items.slice(0, formattedBookData.items.length)

        let filteredTenBooks: Book[] = [];
    
        firstTenBooks.forEach((element: { [x: string]: any }) => {
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
    
        res.status(HTTPStatus.OK).json(filteredTenBooks)
        return;
    }

    res.status(HTTPStatus.BAD)
    throw new Error('Retrieving book info failed')
})


export {
    getBook
}