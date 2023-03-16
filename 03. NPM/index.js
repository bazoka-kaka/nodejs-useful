const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

console.log(format(new Date(), "yyyy-MM-dd\tHH:mm:ss"));
// generate new id
console.log(uuid());
