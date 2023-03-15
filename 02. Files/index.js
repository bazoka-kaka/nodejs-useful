// const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you!"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseAppend.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseAppend.txt"),
      "utf-8"
    );
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

// fs.readFile("./files/lorem.txt", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data.toString());
// });

// fs.readFile(
//   path.join(__dirname, "files", "lorem.txt"),
//   "utf-8",
//   (err, data) => {
//     if (err) {
//       throw err;
//     }
//     console.log(data);
//   }
// );

// fs.writeFile(
//   path.join(__dirname, "files", "written.txt"),
//   "This is the best application ever.",
//   (err) => {
//     if (err) throw err;
//     console.log("Write completed");

//     fs.appendFile(
//       path.join(__dirname, "files", "written.txt"),
//       " And the maker is bazoka-kaka.",
//       (err) => {
//         if (err) throw err;
//         console.log("File appended");

//         fs.rename(
//           path.join(__dirname, "files", "written.txt"),
//           path.join(__dirname, "files", "appended.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename completed");
//           }
//         );
//       }
//     );
//   }
// );

// exit on uncaught error
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error: " + err);
  process.exit(1);
});
