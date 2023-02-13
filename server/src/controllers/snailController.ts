import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";

const getSnail = asyncHandler(async (req: Request, res: Response) => {
	console.log("in getSnail");
});

const updateSnail = asyncHandler(async (req: Request, res: Response) => {
	console.log("in updateSnail");
});

const createSnail = asyncHandler(async (req: Request, res: Response) => {
	console.log("in createSnail");
});

const deleteSnail = asyncHandler(async (req: Request, res: Response) => {
	console.log("in deleteSnail");
});

export { getSnail, updateSnail, createSnail, deleteSnail };
