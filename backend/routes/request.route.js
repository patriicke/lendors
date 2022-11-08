const express = require("express");
const Request = require("./../models/request");
const { registerDefinition } = require("swaggiffy");
const {
  denyRequest,
  grantRequest,
  newRequest
} = require("../controllers/request.controller");
const {
  checkLoggedIn,
  checkAdminRole
} = require("./../middlewares/auth.middleware");
const requestRouter = express.Router();

requestRouter.get("/all", [checkLoggedIn, checkAdminRole], async (req, res) => {
  res
    .status(200)
    .json({ message: "All requests", requests: await Request().findAll() });
});

requestRouter.get(
  "/grant/:requestId",
  [checkLoggedIn, checkAdminRole],
  grantRequest
);
requestRouter.get(
  "/deny/:requestId",
  [checkLoggedIn, checkAdminRole],
  denyRequest
);
requestRouter.post("/new", [checkLoggedIn], newRequest);

registerDefinition(requestRouter, {
  tags: "requests",
  mappedSchema: "Request",
  basePath: "/request"
});

module.exports = requestRouter;
