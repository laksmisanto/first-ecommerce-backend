require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/dbConfig");
var cors = require("cors");
const router = require("./routes");

//mongodb database connection
connectDB();

// init midilware
app.use(cors());
app.use(express.json());
app.use(router);

const Port = process.env.PORT || 8000;

app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
