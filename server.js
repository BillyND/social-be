const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./src/config/database");
const userRouter = require("./src/routes/UserRoutes");
dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;

const app = express();

app.use(express.json()); //for json
app.use(cors());

//router
app.use("/v1/api", userRouter);

app.get("/", (req, res) => {
  return res.status(200).json({
    mess: "okk",
  });
});

// testConnection
let testConnect = async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`>>> App running on http://${hostname}:${port}`);
    });
  } catch (error) {
    console.log(">>>> Error", error);
  }
};
testConnect();