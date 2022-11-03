const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { connect } = require("./config/db/connection");
const User = require("./models/User");
connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.create({ firstName, lastName });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
