import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPStatus.OK).json("In register user");
 })

 const authenticateUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPStatus.OK).json("In authenticate user");
 })

 const getUserInformation = asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPStatus.OK).json("In get user info");
 })

 export {registerUser, authenticateUser, getUserInformation}