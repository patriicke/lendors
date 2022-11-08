const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
const cors = require("cors");
const { Swaggiffy } = require("swaggiffy");
const { connectToDB } = require("./utils/database");
const carRouter = require("./routes/car.route");
const userRouter = require("./routes/user.route");
const requestRouter = require("./routes/request.route");
const corsOptions = require("./utils/cors");
dotenv.config();

app.use(bodyParser.json({ limit: "1mb" }));

connectToDB();

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to the lendors server" });
});
app.use("/request", requestRouter);
app.use("/car", carRouter);
app.use("/user", userRouter);
app.use("*", (req, res) => {
  return req.url === "/docs/"
    ? null
    : res.status(404).json({
        message: "Route not found"
      });
});
app.listen(PORT, (err) => {
  if (err) console.log("Error running server");
  else console.log(`Server running on PORT:${PORT}`);
});
// new Swaggiffy().setupExpress(app).swaggiffy();
