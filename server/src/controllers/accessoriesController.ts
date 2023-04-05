import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";

const getAccessory = asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPStatus.OK).json("In get accessory");
	
});

const getAllAccessories = asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPStatus.OK).json("In get all accessory");
	
});

const addAccessory = asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPStatus.OK).json("In add accessory");

});

const deleteAccessory = asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPStatus.OK).json("In delete accessory");
	
});


export { getAccessory, getAllAccessories, addAccessory, deleteAccessory };
