const express = require("express");
const { registerDefinition } = require("swaggiffy");
const {
  createAccount,
  loginUser,
  deleteUser,
  updateUser,
  getUser,
  allUsers,
  AdminDeleteUser
} = require("../controllers/user.controller");
const {
  checkLoggedIn,
  checkAdminRole
} = require("../middlewares/auth.middleware");
const userRouter = express.Router();
userRouter.post("/new", createAccount);
userRouter.post("/login", loginUser);
userRouter.delete("/delete", [checkLoggedIn], deleteUser);
userRouter.delete(
  "/delete/:userId",
  [checkLoggedIn, checkAdminRole],
  AdminDeleteUser
);
userRouter.patch("/update", [checkLoggedIn], updateUser);
userRouter.get("/details", [checkLoggedIn], getUser);
userRouter.get("/all", allUsers);
registerDefinition(userRouter, {
  tags: "Users",
  mappedSchema: "User",
  basePath: "/user"
});

module.exports = userRouter;
