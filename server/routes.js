const express = require("express");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const { signupValidationRules, validate } = require("./validator");

const router = express.Router();

const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/**
 * Auth routes /api/auth
 */
router.post(
  "/api/auth/signup",
  signupValidationRules(),
  validate,
  catchErrors(authController.signUp)
);
router.post("/api/auth/signin", authController.signin);
router.get("/api/auth/signout", authController.signout);

router.get("/api/auth/", authController.home);

/**
 * User routes /api/users/
 */
router.param("userId", userController.getUserById);

router.put(
  "/api/users/follow",
  authController.checkAuth,
  catchErrors(userController.addFollowing),
  catchErrors(userController.addFollower)
);
router.put(
  "/api/users/unfollow",
  authController.checkAuth,
  catchErrors(userController.deleteFollowing),
  catchErrors(userController.deleteFollower)
);

router
  .route("/api/users/:userId")
  .get(userController.getAuthUser)
  .put(
    authController.checkAuth,
    userController.uploadAvatar,
    catchErrors(userController.resizeAvatar),
    catchErrors(userController.updateUser)
  )
  .delete(authController.checkAuth, catchErrors(userController.deleteUser));

router.get("/api/users", userController.getUsers);
router.get("/api/users/profile/:userId", userController.getUserProfile);
router.get(
  "/api/users/feed/:userId",
  authController.checkAuth,
  catchErrors(userController.getUserFeed)
);

module.exports = router;
