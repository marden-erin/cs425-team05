import express from "express";
import {
	addCluster,
	getCluster,
	updateCluster,
	deleteCluster,
} from "../controllers/clusterController";

const clusterRouter = express.Router();

//gets every book from cluster
clusterRouter.get("/", getCluster);

//creates cluster
clusterRouter.put("/", updateCluster);

//updates cluster name
clusterRouter.post("/", addCluster);

//deletes cluster and its contents
clusterRouter.delete("/", deleteCluster);

export default clusterRouter;
