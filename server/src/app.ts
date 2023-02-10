import express from "express";
import bookRouter from "./routes/bookRoutes";
import clusterRouter from "./routes/clusterRoutes";
import booksInClusterRouter from "./routes/booksInClusterRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/book/", bookRouter);
app.use("/api/clusters", clusterRouter);
app.use("/api/booksInClusters", booksInClusterRouter);

export default app;
