const express = require("express");
const router = express.Router();
const {signOut, signUp} = require("../controllers/auth");

router.get("/signout", signOut);
router.post("/signup", signUp)

module.exports = router;
