let fs = require("fs");

module.exports = async (page, scenario,domain) => {
    const myCookies = [{
        "domain": domain,
        "name": "_be_uiEnabled",
        "value": "true"
    },{
        "domain": domain,
        "name": "_be_raceCardEnabled",
        "value": "true"
    }];
    // await page.evaluate(() => document.cookie = '_be_uiEnabled=true; path=/');
    // await page.evaluate(() => document.cookie = '_be_raceCardEnabled=true; path=/');
    await page.setCookie(...myCookies);
    console.log("cookies have been set..");
};
