import express from "express";
import {
	addCluster,
	getCluster,
	updateCluster,
	deleteCluster,
} from "../controllers/clusterController";

const clusterRouter = express.Router();

clusterRouter.get("/", getCluster);

clusterRouter.put("/", updateCluster);

clusterRouter.post("/", addCluster);

clusterRouter.delete("/", deleteCluster);

export default clusterRouter;
