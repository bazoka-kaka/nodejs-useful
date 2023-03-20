const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.get("^/$|index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// redirection
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); // 302 by default
});

// route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to access hello.html");
    next();
  },
  (req, res, next) => {
    res.send("Hello World!");
  }
);

// chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("chaining route called");
};

app.get("/chained", [one, two, three]);

// not found page
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
