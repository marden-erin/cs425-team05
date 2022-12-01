import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config();

const port: any = process.env.PORT || 5000;

const app = express();

app.listen(port, (): void => console.log(`Server running on port ${port}`));