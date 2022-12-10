import express from "express";
import {
	addCluster,
	getCluster,
	updateCluster,
	deleteCluster,
} from "../controllers/clusterController";

const clusterRouter = express.Router();

clusterRouter.get("/", getCluster);

clusterRouter.put("/", addCluster);

clusterRouter.post("/", updateCluster);

clusterRouter.delete("/", deleteCluster);

export default clusterRouter;
