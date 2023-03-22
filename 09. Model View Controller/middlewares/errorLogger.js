const { logEvents } = require("./logEvents");

const errorLogger = (err, req, res, next) => {
  console.log(`${err.name}: ${err.message}`);
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  next();
};

module.exports = errorLogger;
