// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";

// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (process.env.NODE_ENV === "development") {
      // In development, allow localhost
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }
    } else {
      // In production, allow all origins (since frontend and backend are on same domain)
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// Serve frontend build in production (only if it exists)
// IMPORTANT: This must be after API routes to avoid catching API requests
if (process.env.NODE_ENV !== "development") {
  const frontendDistPath = path.join(__dirname, "/frontend/dist");
  
  if (fs.existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));

    // Catch-all handler: send back React's index.html file for non-API routes
    app.get("*", (req, res, next) => {
      // Don't serve index.html for API routes
      if (req.path.startsWith("/api/")) {
        return next();
      }
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
  } else {
    console.log("Frontend build not found. Serving API only.");
  }
}

app.listen(port, () => console.log(`Server running on port: ${port}`));
