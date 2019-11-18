const User = require("../models/User");
const passport = require("passport");

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await new User({ name, email, password });
  await User.register(user, password, (err, user) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    res.status(200).json(user.name);
  });
};

exports.signin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    if (!user) {
      return res.status(400).json(info.message);
    }
    req.logIn(user, err => {
      if (err) {
        return res.status(500).json(err.message);
      }

      res.status(200).json(user);
    });
  })(req, res, next);
};

exports.signout = (req, res) => {
  res.clearCookie("next-connect.sid");
  req.logout();
  res.json({ message: "You are now signed out" });
};

exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
};
