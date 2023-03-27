import express from "express";
import { getGrave, getAllGraves, updateGrave, deleteGrave, createGrave } from "../controllers/graveyardController";
const graveyardRouter = express.Router();

//gets grave info
graveyardRouter.get("/", getGrave);

// gets all graves from user
graveyardRouter.get("/:userName", getAllGraves);

//modifies grave
graveyardRouter.put("/", updateGrave);

//adds grave
graveyardRouter.post("/", createGrave);

//deletes grave
graveyardRouter.delete("/", deleteGrave);

export default graveyardRouter;