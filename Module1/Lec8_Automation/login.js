const puppeteer = require('puppeteer');
const id = "niyeja8584@sc2hub.com"
const pw = "123456";
let tab;
let idx;
let browserOpenPromise = puppeteer.launch({ headless: false, defaultViewport: null, args: ["--start-maximized"] });
//console.log(browserOpenPromise);
browserOpenPromise.then(function (browser) {
    console.log("browser is opened !");
    return browser.pages();
})
    .then(function (pages) {
        tab = pages[0];
        return tab.goto("https://www.hackerrank.com/auth/login");
    })
    .then(function () {
        return tab.type("#input-1", id);
    })
    .then(function () {
        return tab.type("#input-2", pw);
    })
    .then(function () {
        return tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    })
    .then(function () {
        return waitAndClick("#base-card-1-link");
    })
    .then(function () {
        return waitAndClick('a[data-attr1="warmup"]');
    })
    .then(function () {
        return tab.waitForSelector(".js-track-click.challenge-list-item", { visible: true });
    })
    .then(function () {
        return tab.$$(".js-track-click.challenge-list-item");
    })
    .then(function (allQuesArray) {
        let allPendingPromise = [];
        for (let i = 0; i < allQuesArray.length; i++) {
            let oneATag = allQuesArray[i];
            let pendingPromise = oneATag.evaluate(function (element) {
                return element.getAttribute("href")
            }, oneATag)
            allPendingPromise.push(pendingPromise);
        }
        //console.log(allPendingPromise);
        let allPromiseCombined = Promise.all(allPendingPromise);
        return allPromiseCombined;

    })
    .then(function (allQuesLinks) {
        let oneQuesSolvePromise = solveQuestion(allQuesLinks[0]);
        for(let i=1; i<allQuesLinks.length; i++){
            oneQuesSolvePromise = oneQuesSolvePromise.then(function(){
                let nextQuesSolvePromise = solveQuestion(allQuesLinks[i]);
                return nextQuesSolvePromise;
            })
        }
        return oneQuesSolvePromise
    })
    .then(function () {
        console.log("All Ques Successfully !!!!")
    })

    .catch(function (err) {
        console.log(err);
    });
function getCode() {
    return new Promise(function (scb, fcb) {
        let waitPromise = tab.waitForSelector(".hackdown-content h3", { visible: true });
        waitPromise.then(function () {
            return tab.$$(".hackdown-content h3");
        })
            .then(function (allCodeNamesElement) {
                let allCodeNamesPromise = [];
                for (let i = 0; i < allCodeNamesElement.length; i++) {
                    let codeNamePromise = tab.evaluate(function (element) {
                        return element.textContent
                    }, allCodeNamesElement[i])
                    allCodeNamesPromise.push(codeNamePromise);
                }
                let combinedPromise = Promise.all(allCodeNamesPromise);
                return combinedPromise;

            })
            .then(function (allCodesName) {
                for (let i = 0; i < allCodesName.length; i++) {
                    if (allCodesName[i] == "C++") {
                        idx = i;
                        break;
                    }
                }
                return tab.$$(".hackdown-content .highlight");
            })
            .then(function (allCodeDiv) {
                let codeDiv = allCodeDiv[idx];
                return tab.evaluate(function (elem) { return elem.textContent }, codeDiv);
            })
            .then(function (code) {
                gCode = code;
                scb();
            })
            .catch(function (error) {
                fcb(error);
            })
    })
}

function pasteCode() {
    return new Promise(function (scb, fcb) {
        let waitAndClickPromise = waitAndClick(".checkbox-input");
        waitAndClickPromise.then(function () {
            return tab.waitForTimeout(2000);
        })
            .then(function () {
                return tab.type('.custominput', gCode);
            })
            .then(function () {
                return tab.keyboard.down("Control");
            })
            .then(function () {
                return tab.keyboard.press("A");
            })
            .then(function () {
                return tab.keyboard.press("X");
            })
            .then(function () {
                return tab.click('.monaco-scrollable-element.editor-scrollable.vs');
            })
            .then(function(){
                return tab.keyboard.press("A");
            })
            .then(function(){
                return tab.keyboard.press("V");
            })
            .then(function(){
                return tab.keyboard.up("Control");
            })
            .then(function(){
                scb();
            })
    })
}
function handleLockBtn(){
    return new Promise(function(scb,fcb){
        let waitforLockBtn = tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000})
        waitforLockBtn.then(function(){
            tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled')
        })
        .then(function(lockButton){
            return tab.evaluate(function(elem){return elem.click()}, lockButton);
        })

        .then(function(){
            console.log("lock button found");
            scb();
        })
        .catch(function(){
            console.log("lock button not found");
            scb();
        })
    }) 
}
function solveQuestion(quesLink) {
    return new Promise(function (scb, fcb) {
        let gotoPromise = tab.goto("https://www.hackerrank.com" + quesLink);
        gotoPromise.then(function () {
            return waitAndClick('div[data-attr2="Editorial"]');
        })
        .then(function(){
            return handleLockBtn();
        })
            .then(function () {
                return getCode();
            })
            .then(function () {
                return tab.click('div[data-attr2="Problem"]')
            })
            .then(function () {
                return pasteCode();
            })
            .then(function(){
                return tab.click('.ui-btn.ui-btn-normal.ui-btn-primary')
            })
            .then(function(){
                scb();
            })
            .catch(function (error) {
                fcb(error);
            })
    })
}

function waitAndClick(selector) {
    return new Promise(function (scb, fcb) {
        let waitPromise = tab.waitForSelector(selector, { visible: true });
        waitPromise.then(function () {
            return tab.click(selector);
        })
            .then(function () {
                scb();
            })
            .catch(function () {
                fcb();
            })
    })
}