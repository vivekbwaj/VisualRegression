const log = console.log.bind(global);

const clickSelectors = async (scenario , page) => {
    const { clickThis } = scenario;
    const selectors = Array.from(clickThis);

    if (!selectors) return;

    for (let selector of selectors) {
        log(`Click selector >> ${selector}`);
        await page.waitFor(selector);
        await page.click(selector);
        log(`Clicked >> ${selector}`);
    }
};

module.exports = clickSelectors;