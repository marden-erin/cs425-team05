import mysql from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();

export default mysql.createConnection({
	host: process.env.DB_HOST,
	port: 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});
