const express = require("express");
const router = express.Router();

const {findUserById, getUser} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");

router.param("userId", findUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)

module.exports = router;
