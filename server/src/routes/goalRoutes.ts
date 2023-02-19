import express from "express";
import {
	getAllGoals,
	getGoal,
	addGoal,
	updateGoal,
	deleteGoal,
} from "../controllers/goalController";

const goalRouter = express.Router();

//gets individual goal
goalRouter.get("/:userName/:goalID", getGoal);

// gets all goals from user
goalRouter.get("/:userName", getAllGoals);

//modifies goal
goalRouter.put("/", updateGoal);

//adds goal
goalRouter.post("/", addGoal);

//deletes goal
goalRouter.delete("/", deleteGoal);

export default goalRouter;
