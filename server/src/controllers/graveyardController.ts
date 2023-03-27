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
    console.log("in create grave");
    res.status(HTTPStatus.OK).json("in create grave");
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
