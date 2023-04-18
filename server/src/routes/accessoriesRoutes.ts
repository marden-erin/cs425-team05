import express from "express";
import { getAccessory, getAllAccessories, addAccessory, deleteAccessory } from "../controllers/accessoriesController";
const accessoriesRouter = express.Router();

accessoriesRouter.get("/:username", getAllAccessories);
accessoriesRouter.get("/:username/:id", getAccessory);
accessoriesRouter.post("/", addAccessory);
accessoriesRouter.delete("/", deleteAccessory);

export default accessoriesRouter;
