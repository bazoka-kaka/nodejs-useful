const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middlewares/logEvents");
const errorLogger = require("./middlewares/errorLogger");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/root"));
app.use("/api/employees", require("./routes/api/employees"));

// 404 not found
app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 - Not Found" });
  } else {
    res.type("txt").send("404 - Not Found");
  }
});

app.use(errorLogger);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
