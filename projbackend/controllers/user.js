const User = require("../models/user");

exports.findUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {

    //get back here
  return res.json(req.profile);
};
