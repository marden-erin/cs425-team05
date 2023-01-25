import mysql from "mysql2";
import * as dotenv from "dotenv";

dotenv.config()

//TODO: Put user and host in envj
export default mysql.createConnection({
	host: "testdb.chrd81qajl2u.us-west-2.rds.amazonaws.com",
    port: 3306,
	user: "admin",
	password: process.env.DB_PASSWORD,
	database: "testdb",
});
