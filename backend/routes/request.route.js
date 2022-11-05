const express = require("express");
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
