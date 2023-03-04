import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";

const PORT = 5000;

dotenv.config();
const app = express();

// (async () => {
//     await db.sync();
// })();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", userRouter);
app.use("/api", postRouter);


app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
