let fs = require("fs");
let f1KaData = fs.readFileSync("./f1.txt");
console.log(f1KaData + "")
fs.writeFileSync("f2.txt" , "hello world");
fs.writeFileSync('f1.txt' , "hi i am changed");
//fs.writeFileSync("../activity/activity.js" , "eufbrugfe")
