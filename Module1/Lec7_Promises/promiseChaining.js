const fs = require("fs");
let f1KaPromise = fs.promises.readFile("./f1.txt");
f1KaPromise.then(function(f1KaData){
    console.log(f1KaData + "");
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    return f2KaPromise;
})
.then(function(f2KaData){
    console.log(f2KaData + "");
    let f3KaPromise = fs.promises.readFile("./f3.txt");
    return f3KaPromise;
})
.then(function(f3KaData){
    console.log(f3KaData+"");
})
