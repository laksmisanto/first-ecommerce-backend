require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const connectDB = require("./config/dbConfig");
var cors = require("cors");
const app = express();

//mongodb database connection
connectDB();

app.get("/", function (req, res) {
  res.send("this is backend first file");
});

//init midilware
// app.use(cors());
// app.use(express.json());
// app.use(routes);

const Port = process.env.PORT || 8000;

app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
