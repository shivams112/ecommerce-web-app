const express = require("express");
const router = express.Router();
const { signOut, signUp } = require("../controllers/auth");
const { check } = require("express-validator");

router.get("/signout", signOut);

router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 char").isLength({ min: 3 }),
    check("email", "email is not correct").isEmail(),
    check("password", "password should be atleast 3 char").isLength({ min: 3 }),
  ],
  signUp
);

module.exports = router;
