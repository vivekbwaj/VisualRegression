const clickSelectors = require("../engineUtils/custom_ClickSelectors.js");

module.exports = async (page, scenario) => {
    console.log("SCENARIO > " + scenario.label);
    await require("./clickAndHoverHelper")(page, scenario);
    const screenshotDir = process.cwd() + "/backstop_data/engine_Scripts_Screenshots/";

    console.log("Page title is..." + await page.mainFrame().title());
    await page.screenshot({path: screenshotDir + "mainPage.png", fullPage: true});
    const loginButton = await page.$("button[class='login-flyout-button__title']");
    await loginButton.click();
    await page.waitForSelector("form.cb-form");
    const uNameField = await page.$("input[name='username']");
    await uNameField.type("vivekbwaj.88@gmail.com");
    const pwdField = await page.$("input[name='password']");
    await pwdField.type("12345");
    const loginBtn = await page.$("button[type='submit']");
    await loginBtn.click();

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
