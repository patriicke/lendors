const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 80;
const dotenv = require("dotenv");
const { connectToDB } = require("./utils/database");
const { Swaggiffy } = require("swaggiffy");
const carRouter = require("./routes/car.route");
const userRouter = require("./routes/user.route");
const cors = require("cors");
const requestRouter = require("./routes/request.route");

dotenv.config();

app.use(bodyParser.json({ limit: "5mb" }));

connectToDB();

app.use(cors());
app.use("/request", requestRouter);
app.use("/car", carRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to the drive server" });
});

app.listen(PORT, (err) => {
  if (err) console.log("Error running server");
  console.log(`Server UP on PORT ${PORT}`);
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found"
  });
});
// new Swaggiffy().setupExpress(app).swaggiffy();
