const clickSelectors = require("../engineUtils/custom_ClickSelectors.js");

module.exports = async (page, scenario) => {
    console.log("SCENARIO > " + scenario.label);
    await require("./clickAndHoverHelper")(page, scenario);
    await clickSelectors(scenario, page);
};