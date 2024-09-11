import database from "../database/connection.js";

const createNewUserSQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar(255) UNIQUE,
    email varchar(255) UNIQUE,
    password varchar(255),
    is_admin boolean DEFAULT false,
    created_at timestamp DEFAULT NOW()
);
`;

async function createUsersTable() {
  try {
    await database.query(createNewUserSQL);
    console.log("Users table ready.");
  } catch (error) {
    return console.log("Error creating users table", error);
  }
}

export default createUsersTable;
