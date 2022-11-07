const User = require("../models/user");
const Car = require("../models/car");
const { mailTo } = require("../utils/email");
const dateFns = require("date-fns");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.createAccount = async (req, res) => {
  try {
    const { names, email, address, telephone, password } = req.body;
    const joined = Date.now();
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User().create({
      names,
      email,
      role: "user",
      joined,
      address,
      telephone,
      password: hashedPassword
    });
    const token = jwt.sign(
      { userId: user.id, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      {}
    );
    return res
      .status(200)
      .json({ message: "Account created successfully", user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.errors[0].message });
  }
};

exports.allUsers = async (req, res) => {
  try {
    console.log("Accessing all user route");
    const users = await User().findAll();
    if (!users)
      return res.status(200).json({ message: "Users not found", users });
    return res
      .status(200)
      .json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User().findOne({ where: { id: userId } });
    if (!user)
      return res.status(500).json({ message: "Error getting user data" });
    return res.status(200).json({ message: "Getting user successfull", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await (await User().findOne({ email })).get({ plain: true });
    if (!user)
      return res.status(400).json({ message: "Email entered does not exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });
    const isAdmin = user.role === "admin" ? true : false;
    const token = await jwt.sign(
      { userId: user.id, isAdmin },
      process.env.JWT_SECRET_KEY,
      {},
      {}
    );
    const returnedUser = { ...user };
    delete returnedUser.password;
    return res
      .status(200)
      .json({ message: "Logged in successfully", user: returnedUser, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.carRequest = async (req, res) => {
  try {
    const { carId } = req.params;
    const { userId } = req.user;
    const { startDate, endDate } = req.body;

    const user = await User().findOne({ where: { id: userId } });

    const car = await Car().findOne({ where: { id: carId } });
    if (!car) return res.status(400).json({ message: "Car not found" });

    const request = Request.create({
      startDate,
      endDate,
      userId,
      carId
    });

    if (!request)
      return res.status(500).json({ message: "Unable to create car request" });

    await mailTo(
      user.email,
      "Hello there",
      `<b>Car ${car.name} is being requested by ${user.names}(you)</b>.\n 
            <p>You needs to use it from <strong>${dateFns.format(
              startDate,
              "MMM do YYYY"
            )} until ${(endDate, "MMM do YYYY")}.</strong>\n</p>
            <br><br>
            `,
      `Car Request by ${user.names} via drive`
    );
    return res
      .status(200)
      .json({ message: "Car request submitted successfully", car });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.params;
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;
    await User().destroy({ where: { id: userId } });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.AdminDeleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User().destroy({ where: { id: userId } });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, address, telephone } = req.body;

    const user = User().findOne({ where: { id: userId } });
    await user.update({ name, email, address, telephone });
    if (!user) return res.status(400).json({ message: "User doen't exist" });
    return res.status(200).json({ message: "User updated succesfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
