const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = async (msg, fileName) => {
  const dateTime = `${format(new Date(), "ddMMyyy\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};

module.exports = { logEvents, logger };
