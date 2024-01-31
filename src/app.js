// Import necessary modules from the Express framework and external packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import indexRouter from "./routes/index.route.js";
import "./services/deleteOTP.js";
import { v2 as cloudinary } from "cloudinary";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import CORS options from the configuration file
import { corsOptions } from "./config/cors.config.js";

// Create an Express application instance
const app = express();

// Middleware and configuration setup

// Enable Cross-Origin Resource Sharing (CORS) using predefined options
app.use(cors(corsOptions));

// Parse incoming JSON requests with a limit of 16KB
app.use(express.json());

// Parse incoming URL-encoded data with extended support and a limit of 16KB
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse cookies using the cookie-parser middleware
app.use(cookieParser());

app.use(indexRouter);

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(path.join(__dirname, "../dist"));

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Export the configured Express application instance for use in other parts of the application
export { app };
