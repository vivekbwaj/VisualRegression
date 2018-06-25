const clickSelectors = require("../engineUtils/custom_ClickSelectors.js");

module.exports = async (page, scenario) => {
    console.log("SCENARIO > " + scenario.label);
    await require("./clickAndHoverHelper")(page, scenario);
    const screenshotDir = process.cwd() + "/backstop_data/engine_Scripts_Screenshots/";


    console.log("Onready script started to login through modal login.... ");
    await page.waitForSelector("#login-modal-form");
    await page.screenshot({path: screenshotDir + "modalLogin.png", fullPage: true});
    const uNameField = await page.$("input[id='modal-login-username']");
    await uNameField.type("vivekbwaj.88@gmail.com");
    const pwdField = await page.$("input[id='modal-login-password']");
    await pwdField.type("12345");
    const loginlink = await page.$("a[id='modal-login-trigger']");
    await loginlink.click();

    await page
        .waitForSelector("div.account-btn-text")
        .then(() => {
            page.screenshot({path: screenshotDir + "loggedIn.png", fullPage: true});
        });
    const loggedInBy = await page.$("div.header-rhs");
    await loggedInBy.screenshot({
        path: screenshotDir + "loggedInBy.png"
    });
    await page.waitForSelector("div.bv-bet-vision");
    await page.waitFor(5000);

    await clickSelectors(scenario, page);
};
