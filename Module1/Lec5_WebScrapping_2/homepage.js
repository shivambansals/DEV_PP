let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const cheerio = require("cheerio");
const request = require("request");
const getAllMatches = require("./allMatches");

request(matchLink , function(err, res , data){
    processData(data);
})

function processData(html){
    let myDocument = cheerio.load(html);
    let aTag =myDocument(".widget-items.cta-link a");
    //console.log(aTag);
    let allMatchesLink = "http://www.espncricinfo.com" + aTag["0"].attribs.href;
   // console.log(allMatchesLink);
    getAllMatches(allMatchesLink);

}
