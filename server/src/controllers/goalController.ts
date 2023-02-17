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
    console.log("add goal");
});

const updateGoal = asyncHandler(async (req: Request, res: Response) => {
	console.log("update goal");
});

const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
    console.log("in delete goal");
});


export { getGoal, getAllGoals, addGoal, updateGoal, deleteGoal };
