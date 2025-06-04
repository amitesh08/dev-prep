const fs = require("fs");

console.log("start");

const content = fs.readFileSync(__dirname + "/hello.txt", "utf-8");
console.log("file read - " + content);

console.log("end");
