import express from "express";
import {
	addCluster,
	getCluster,
	updateCluster,
	deleteCluster,
	getAllClusters,
} from "../controllers/clusterController";

const clusterRouter = express.Router();

//gets every book from individual cluster
clusterRouter.get("/", getCluster);

// gets all clusters from user
clusterRouter.get("/:userName", getAllClusters);

//modifies cluster
clusterRouter.put("/", updateCluster);

//adds cluster
clusterRouter.post("/", addCluster);

//deletes cluster and its contents
clusterRouter.delete("/", deleteCluster);

export default clusterRouter;
