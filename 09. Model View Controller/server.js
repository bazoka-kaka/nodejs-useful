const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const corsOptions = require("./config/corsOption");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

/**
 * built in middleware to handle urlencoded data
 * "application/x-www-form-urlencoded"
 */
app.use(express.urlencoded({ extended: false }));

// built in middleware for json data
app.use(express.json());

// serve static files
app.use("/", express.static(path.join(__dirname, "public")));

// routes
app.use("/", require(path.join(__dirname, "routes", "root.js")));
app.use(
  "/api/employees",
  require(path.join(__dirname, "routes", "api", "employees.js"))
);

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
