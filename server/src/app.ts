import express from "express";
import bookRouter from "./routes/bookRoutes";
import clusterRouter from "./routes/clusterRoutes";
import booksInClusterRouter from "./routes/booksInClusterRoutes";
import snailRouter from './routes/snailRoutes'
import goalRouter from './routes/goalRoutes'
import userRouter from './routes/userRoutes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/book/", bookRouter);
app.use("/api/clusters", clusterRouter);
app.use("/api/booksInClusters", booksInClusterRouter);
app.use("/api/snails", snailRouter); 
app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

export default app;
