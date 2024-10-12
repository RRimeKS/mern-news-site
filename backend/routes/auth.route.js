const router = require('express').Router();;
const authController = require("../controllers/auth.controller");
const { isAuthenticated,  checkedRole } = require('../middlewares/authenticationMiddleware');

router.route("/register").post(isAuthenticated, checkedRole("admin"), authController.register);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

router.route("/users").get(isAuthenticated, checkedRole("admin"), authController.getAllUser);
router.route("/user/:id")
.get(isAuthenticated, checkedRole("admin"), authController.getUserDetails)
.delete(isAuthenticated, checkedRole("admin"), authController.deleteUser)
.put(isAuthenticated, checkedRole("admin"), authController.updateUser);

router.route("/me").get(isAuthenticated, authController.me);

module.exports = router;