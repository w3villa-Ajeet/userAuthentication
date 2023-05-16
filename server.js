import express from "express";
import dotenv from "dotenv";

//configure env
dotenv.config();

//rest object
const app = express();

//rest api
app.get("/", (req, res) => {
  res.send("<h1>welcome to use authentication system</h1>");
});

//PORT
const PORT = process.env.PORT || 9600;

//server listen
app.listen(PORT, () => {
  console.log(`Server Running  on port ${PORT}`);
});
