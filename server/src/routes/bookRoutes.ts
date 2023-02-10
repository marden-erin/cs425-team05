import express from "express";
import { getBook } from "../controllers/bookController";
const bookRouter = express.Router();

bookRouter.get("/", getBook);

export default bookRouter;
