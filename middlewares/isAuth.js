import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import database from "../database/connection.js";
dotenv.config();

async function isAuth(req, res, next) {
  // Get token from header, if not found return error 401
  const headers = req.headers;
  // console.log(headers.authorization.split(" ")[1]);
  const token = headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const produceAt = new Date(decoded.iat * 1000);

    // if token more than 1 hour old, reject
    const now = new Date();
    const diff = now - produceAt;
    const diffInHours = diff / 1000 / 60 / 60;

    // Calculate the expiration time by using diffInHours

    if (diffInHours > 24) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if user is valid in the database
    const query = `
  SELECT * FROM users WHERE id = $1 AND email=$2 AND username = $3
  `;
    const resDb = await database.query(query, [
      decoded.id,
      decoded.email,
      decoded.username,
    ]);

    if (resDb.rows.lenth === 0) {
      // Error message must be very generic to avoid leaking information
      return res.status(401).json({ message: "Unauthorized" });
    }
    // IMPORTANT: reassign req.user to decoded token
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default isAuth;
