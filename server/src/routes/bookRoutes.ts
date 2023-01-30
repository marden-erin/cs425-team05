import express from "express";
import { getBook } from "../controllers/bookController";
const bookRouter = express.Router();

bookRouter.get("/:bookTitle?", getBook);

export default bookRouter;
