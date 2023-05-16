import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>welcome to use authentication system</h1>");
});

//PORT
const PORT = process.env.PORT || 9700;

//server listen
app.listen(PORT, () => {
  console.log(`Server Running  on port ${PORT}`);
});
