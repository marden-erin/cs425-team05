import express from "express";
import {
	getBookFromCluster,
	addBookToCluster,
	updateBookInCluster,
	deleteBookFromCluster,
} from "../controllers/booksInClusterController";
const booksInClusterRouter = express.Router();

//gets cluster's individual book info
booksInClusterRouter.get("/", getBookFromCluster);

//adds book to cluster
booksInClusterRouter.post("/", addBookToCluster);

//updates book info in cluster
booksInClusterRouter.put("/", updateBookInCluster);

//deletes book from cluster
booksInClusterRouter.delete("/", deleteBookFromCluster);

export default booksInClusterRouter;
