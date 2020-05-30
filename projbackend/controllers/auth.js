const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.signUp = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }
    res.json({
      status: "success",
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signOut = (req, res) => {
  res.json({
    message: "Sign out Success",
  });
};
