const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = [
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "https://www.google.com",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
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
app.use("/subdir", express.static(path.join(__dirname, "public")));

// routes
app.use("/", require(path.join(__dirname, "routes", "root.js")));
app.use("/subdir", require(path.join(__dirname, "routes", "subdir.js")));
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
