import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "../src/routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const PORT = process.env.PORT || 3030;
const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); // This middleware will parse JSON bodies: req.body
app.use(ratelimiter);

// Our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}/api/notes`);
  });
});
