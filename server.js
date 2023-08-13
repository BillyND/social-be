require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;
const { connection } = require("./src/config/database");
const app = express();

// const userRoutes = require("./src/routes/UserRoutes");
const articleRoutes = require("./src/routes/articlesRoutes");
const boardRoutes = require("./src/routes/boardRoutes");

const cors = require("cors");

app.use(cors());

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//config req.body
app.use(express.json()); //for json
app.use(express.urlencoded({ extended: true })); //for form data

//routes
// app.use("/api", userRouter);
app.use("/api", articleRoutes);
app.use("/api", boardRoutes);

app.get("/", (req, res) => {
  res.send("Api social running ");
});

// testConnection
let testConnect = async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Example app listening on http://${hostname}:${port}`);
    });
  } catch (error) {
    console.log(">>>>error", error);
  }
};
testConnect();
