import {Request, Response, NextFunction} from 'express'

const errorHandler = (err : Error, req : Request, res : Response, next : NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: err.stack
    })
}


export {
    errorHandler,
}