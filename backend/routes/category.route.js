const router = require('express').Router();;
const categoryController = require("../controllers/category.controller");
const { isAuthenticated,  checkedRole } = require('../middlewares/authenticationMiddleware');

router.route("/category")
.get( categoryController.getCategory)
.post(isAuthenticated, checkedRole("admin"), categoryController.createCategory);

router.route("/category/:id")
.put(isAuthenticated, checkedRole("admin"), categoryController.updateCategory)
.delete(isAuthenticated, checkedRole("admin"), categoryController.deleteCategory);

module.exports = router;