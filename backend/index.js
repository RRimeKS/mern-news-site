const cors = require("cors");
const express = require("express");
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
});

//MODULES
const dotenv = require("dotenv").config({ path: "config/config.env" });
const cookieParser = require("cookie-parser");
const path = require('path');

app.use(express.static(path.join(__dirname, 'client/build')));

//CUSTOM MODULES
const cloudinary = require("./utils/cloudinary");
const mountRoute = require("./routes/index");
const dbConnect = require("./config/dbConnect");
const errorMiddleware = require("./middlewares/error.middleware");

//MIDDLEWARES
app.use(express.json({ limit: "10mb", extended: true }));
app.use(cookieParser());

cloudinary();
dbConnect();

//ROUTE
mountRoute(app);

//SERVER
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`Server started on ${port}`));

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
});
