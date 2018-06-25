module.exports = async (page, scenario) => {
    await require("./loadCookies")(page, scenario);
    console.log("Executing OnBefore...");
    await page.setDefaultNavigationTimeout(30000);
};
