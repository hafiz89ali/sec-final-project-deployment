import express from "express";
import router from "./routes/routes.js";

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(router);

// redirection

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
