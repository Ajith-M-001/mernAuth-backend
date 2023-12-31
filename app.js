import path from "path"
import express from "express";
import connectDB from "./database/db.js";
import userRouter from "./router/userRouter.js";
import { errorHandler, notFound } from "./middleWare/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

const corsOptions = {
  origin: "https://mernauth-frontend-lug7.onrender.com",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("Server started");
});

app.use(notFound);
app.use(errorHandler);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on the port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error connecting mongodb atlas database ${error.message}`);
    process.exit(1);
  }
};

startServer();
