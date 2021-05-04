const fs = require("fs");

let data = fs.readFileSync("./f1.txt", "utf8");
let f2KaData = fs.readFileSync("./f2.txt", "utf8");
function applySFlag(data){
    let emptyIncluded = false;
    let removedSpaces =[];
    let splittedData = data.split("\r\n");
    console.log(splittedData);

    for(let i=0; i<splittedData.length; i++){
        if(splittedData[i] == "" && emptyIncluded == false){
            removedSpaces.push(splittedData[i]);
            emptyIncluded = true;
        }
        else if(splittedData[i] != ""){
            removedSpaces.push(splittedData[i]);
            if(i<splittedData-2) emptyIncluded = false;
        }
    }
    let removedSpacesString = removedSpaces.join("\r\n");
    return removedSpacesString;
}

let removedSpacesString = applySFlag(data);
console.log(removedSpacesString);

function applyBFlag(data){
    let count = 1;
    let splittedData = data.split("\r\n");
    for( let i = 0; i<splittedData.length; i++){
        if(splittedData[i] != ""){
            splittedData[i] = `${count}. ${splittedData[i]}`;
            count++;
        }
    }
    let bFlaggedString = splittedData.join("\r\n");
    return bFlaggedString;
}

let bFlaggedString = applyBFlag(data);
console.log(bFlaggedString);
function applyNFlag(data){
    let count = 1;
    let splittedData = data.split("\r\n");
    for( let i = 0; i<splittedData.length; i++){
        
            splittedData[i] = `${count}. ${splittedData[i]}`;
            count++;
        
    }
    let nFlaggedString = splittedData.join("\r\n");
    return nFlaggedString;
}

let nFlaggedString = applyNFlag(data);
console.log(nFlaggedString);

