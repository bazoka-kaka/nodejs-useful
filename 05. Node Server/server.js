const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");

const { EventEmitter } = require("events");
class Emitter extends EventEmitter {}
const emitter = new Emitter();
emitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, res) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf-8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    res.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    res.end(contentType === "application/json" ? JSON.stringify(data) : data);
  } catch (err) {
    console.error(err);
    emitter.emit("log", err, "errLog.txt");
    res.statusCode = 500;
    res.end("500: Internal server error");
    return;
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  emitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  const extension = path.extname(req.url);
  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // make filepath doesn't require extension
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    // serve file
    serveFile(filePath, contentType, res);
  } else {
    // 404 or 301
    switch (path.parse(req.url).base) {
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      default:
        // serve 404 page
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
