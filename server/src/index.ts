import app from "./app";
import * as dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const port: string | number = process.env.PORT || 5000;

app.listen(port, (): void =>
	console.log(colors.yellow(`Server running on port ${port}`))
);
