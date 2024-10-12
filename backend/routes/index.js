const newsRoute = require("../routes/news.route");
const categoryRoute = require("../routes/category.route");
const authRoute = require("../routes/auth.route");

const mountRoute = (app) => {
    app.use("/api", newsRoute);
    app.use("/api", categoryRoute);
    app.use("/api", authRoute);
}

module.exports = mountRoute;