import express from "express";
import { getGrave, getAllGraves, updateGrave, deleteGrave, createGrave } from "../controllers/graveyardController";
const graveyardRouter = express.Router();

//gets every book from individual cluster
graveyardRouter.get("/", getGrave);

// gets all clusters from user
graveyardRouter.get("/:userName", getAllGraves);

//modifies cluster
graveyardRouter.put("/", updateGrave);

//adds cluster
graveyardRouter.post("/", createGrave);

//deletes cluster and its contents
graveyardRouter.delete("/", deleteGrave);

export default graveyardRouter;