const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.home = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json("No Authorization token");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};

exports.signUp = async (req, res) => {
  const { name, email, password, department } = req.body;
  const user = await new User({ name, email, password, department });
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
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });

      res.status(200).json(token);
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
