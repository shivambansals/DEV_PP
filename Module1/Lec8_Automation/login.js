const puppeteer = require('puppeteer');
let browserOpenPromise = puppeteer.launch({headless: false});
//console.log(browserOpenPromise);
browserOpenPromise.then(function(browser){
    console.log("browser is opened !");
    return abc.pages();
})
.then(function(browser){
    let tab = pages[0];
    return tab.goto("http://www.google.com");
})
.then(function(){
    console.log("On google homepage !!");
})