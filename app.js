const express = require("express"); //returns a function that returns instance of an express app.
const logger = require("morgan");
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));

const pathToStaticAssets = path.join(__dirname, "public");
app.use(express.static(pathToStaticAssets));

app.use(logger("dev"));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieParser());

app.use((req, res, next) => {
  const username = req.cookies.username;
  res.locals.loggedInUserName = username || "";

  next();
});

app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);

const homeRouter = require("./routes/home");
const clucksRouter = require("./routes/cluckRoutes");
app.use("/", homeRouter);
app.use("/clucks", clucksRouter);

const PORT = 3000;
const DOMAIN = "localhost";

app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server is listening on http://${DOMAIN}:${PORT}`);
});
