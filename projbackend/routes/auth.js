const express = require("express");
const router = express.Router();
const { signOut, signUp, signin, isSignedIn } = require("../controllers/auth");
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

router.post(
  "/signin",
  [
    check("email", "email is not correct").isEmail(),
    check("password", "password field is required").isLength({ min: 3 }),
  ],
  signin
);

router.get("/testroute", isSignedIn, (req, res) => res.send("Protected route"));

module.exports = router;
