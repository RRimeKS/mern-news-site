const router = require('express').Router();;
const newsController = require("../controllers/news.controller");
const { isAuthenticated,  checkedRole } = require('../middlewares/authenticationMiddleware');

router.route("/news")
.get(newsController.getNews)
.post(isAuthenticated, checkedRole("admin"), newsController.createNews);

router.route("/popular-news").get(newsController.getPopularNews)

router.route("/news/:slug").get(newsController.getNewsDetails)

router.route("/news/category/:category").get(newsController.getNewsCategory)
router.route("/news/:id")
.put(isAuthenticated, checkedRole("admin"), newsController.updateNews)
.delete(isAuthenticated, checkedRole("admin"), newsController.deleteNews)

router.route("/admin/news").get(isAuthenticated, checkedRole("admin"), newsController.getNewsAdmin);
module.exports = router;