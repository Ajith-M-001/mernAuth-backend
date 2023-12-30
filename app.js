import express from "express";
import connectDB from "./database/db.js";
import userRouter from "./router/userRouter.js";
import { errorHandler, notFound } from "./middleWare/errorHandler.js";
import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("Server started");
});

app.use(notFound);
app.use(errorHandler);
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
