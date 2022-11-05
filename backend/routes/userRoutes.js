const router = require("express").Router();
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Get user
router.post("/user", async (req, res) => {
  try {
    const { username } = req.body;
    const foundUser = await User.findOne({ username });
    if (!foundUser)
      return res.status(404).json({ message: "user is not found" });
    return res.status(200).json({ foundUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//create user
router.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmPassword, fullname } = req.body;
    if (password != confirmPassword) throw new Error("Passwords don't match");
    const user = await User.create({
      email,
      password: await bcrypt.hashSync(password, 10),
      fullname
    });
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN);
    res.status(200).json({ user, accessToken });
    // if (password !== cpassword)
    //   return res.status(400).json({ message: "Passwords don't match" });
    // const foundUserByEmail = await User.findOne({
    //   email
    // });
    // if (foundUserByEmail) {
    //   return res.status(406).json({ message: "Email already exists" });
    // }
    // const foundUserByUsername = await User.findOne({ username });
    // if (foundUserByUsername) {
    //   return res.status(406).json({ message: "Username already exists" });
    // }
    // const foundUserByTelephone = await User.findOne({ telephone });
    // if (foundUserByTelephone) {
    //   return res.status(406).json({ message: "Telephone already exists" });
    // }
    // const accessToken = jwt.sign(
    //   { ...req.body },
    //   process.env.ACCESS_TOKEN_SECRET
    // );
    // const isVerificationEmailExist = await createVerification.findOne({
    //   email: email
    // });
    // return res
    //   .status(201)
    //   .json({ v_reference: verificationCodeReference, accessToken });
  } catch (error) {
    let msg;
    if (error.code == 23505) {
      msg = "User already exists";
    } else {
      msg = error.message;
    }
    console.log(error);
    res.status(error.code ? error.code : 500).json(msg);
  }
});
//login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();
    const { _id, fullname, username, profile, status, telephone, newMessages } =
      user;
    const acc_token = jwt.sign(
      {
        _id,
        fullname,
        username,
        profile,
        status,
        telephone,
        newMessages,
        email
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ acc_token });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
