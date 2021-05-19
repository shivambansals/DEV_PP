const fs = require("fs");

let pendingPromise = fs.promises.readFile("./f1.txt" , "utf8");
console.log(pendingPromise);
pendingPromise.then(function(data){
    console.log("inside scb");
    console.log(pendingPromise);
    console.log(data);

});

pendingPromise.catch(function(error){
    console.log("Inside fcb");
    console.log(error);
})