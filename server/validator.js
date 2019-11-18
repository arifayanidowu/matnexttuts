const { body, validationResult } = require("express-validator");
const signupValidationRules = () => {
  return [
    body(
      "name",
      "Name must be minimum of 5 characters and maximum of 10 characters long"
    ).isLength({ min: 5, max: 10 }),
    // username must be an email
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be minimum of 5 characters long").isLength({
      min: 5
    })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  signupValidationRules,
  validate
};
