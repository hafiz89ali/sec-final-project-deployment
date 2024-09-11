import database from "../database/connection.js";
import { nanoid } from "nanoid";

const createNewLessonPlanSQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS lesson_plans (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    date date,
    time time,
    class_name varchar(255),
    subject_name varchar(255),
    title varchar(255),
    lesson_plan text,
    created_by uuid REFERENCES users(id),
    created_at timestamp DEFAULT NOW(),
    is_submitted boolean DEFAULT false
);
`;

async function createLessonPlansTable() {
  try {
    await database.query(createNewLessonPlanSQL);
    console.log("Lesson plans table ready");
  } catch (error) {
    return console.log("Error creating lesson plans table", error);
  }
}

export default createLessonPlansTable;
