/**
 * difference with vanillaJS:
 * 1. Node runs on the server - not in the web browser
 * 2. console is the terminal window
 * 3. global object instead of window object
 * 4. Has common core modules
 * 5. Commonjs instead of ES6 modules
 * 6. Missing some JS APIs like fetch()
 */

console.log("Hello World!");
// console.log(global);

const os = require("os");
const path = require("path");
const math = require("./math");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));

console.log(math.add(1, 2));
console.log(math.sub(4, 2));
console.log(math.times(2, 2));
console.log(math.div(4, 2));
