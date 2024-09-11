import pg from "pg";
import dotenv from "dotenv";
import createUsersTable from "../models/user.js";
import createLessonPlansTable from "../models/lessonPlan.js";

const { Client } = pg;

// load environment variables from .env file
dotenv.config();

const database = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.DB_SSL === "true",
});

async function testConnectionAndLog() {
  try {
    await database.connect();
    const queryTime = await database.query("SELECT NOW()");
    const databaseName = await database.query("SELECT current_database()");
    const currentTime = queryTime.rows[0].now;
    const currentDatabase = databaseName.rows[0].current_database;
    console.log(`Connected to ${currentDatabase} at ${currentTime}`);
    await createUsersTable();
    await createLessonPlansTable();
  } catch (err) {
    console.error("Error connecting to database", err);
  }
}

testConnectionAndLog();

export default database;
