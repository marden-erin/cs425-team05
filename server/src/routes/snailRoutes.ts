import express from "express";

import {
	getSnail,
	updateSnail,
	createSnail,
	deleteSnail,
	getAllSnails,
} from "../controllers/snailController";

const snailRouter = express.Router();

snailRouter.get("/", getSnail);

snailRouter.get("/all", getAllSnails);

snailRouter.put("/", updateSnail);

snailRouter.post("/", createSnail);

snailRouter.delete("/", deleteSnail);

export default snailRouter;
