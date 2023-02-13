import express from "express";

import {
	getSnail,
	updateSnail,
	createSnail,
	deleteSnail,
} from "../controllers/snailController";

const snailRouter = express.Router();

snailRouter.get("/", getSnail);

snailRouter.put("/", updateSnail);

snailRouter.post("/", createSnail);

snailRouter.delete("/", deleteSnail);

export default snailRouter;
