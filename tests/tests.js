const config = require("../config.js");
let setup = require("../utils/setup.js");
const chalk = require("chalk");

let paths = setup.setPath();
let args = config.ARGS;

let onReadyScriptsArray = {
    "Crownbet/": config.CUSTOM_SCRIPTS_PATHS + "onReady_clickSelector.js",
    "Crownbet/my-account/": config.CUSTOM_SCRIPTS_PATHS + "onReady_modalLogin.js",
    "Crownbet/racing-betting/": config.CUSTOM_SCRIPTS_PATHS + "onReady_clickSelector.js",
    "Crownbet/racing-betting/horse-racing/today/": config.CUSTOM_SCRIPTS_PATHS + "onReady_clickSelector.js"
};

const selectorsArray = [
    ["document"]
    , ["document"]
    , ["document"]
    , ["document"]
    , ["document"]
];

const hideSelectorsArray = {
    "Crownbet/": ["div.cb-carousel", "span#pending-bets-counter", "#betslip-total", ".bv-nextup-race__info", "span.countdown", "div.promotional-banners", ".hdo-location__list", ".rm-bet__details", ".rm-bet__silk", "a.hdo-next-to-jump__tile", "rm-bet__details"]
    , "Crownbet/racing-betting/": ["span#pending-bets-counter", "#betslip-total", ".rm-bet__silk", ".rm-bet__details", ".rm-bet__details"]
    , "Crownbet/racing-betting/horse-racing/today/": ["span#pending-bets-counter", "#betslip-total", ".rm-bet__silk", ".rm-bet__details", ".rm-bet__details"]
};
const remSelectorsArray = {
    "Crownbet/": ["div.banner-item", "div.ntj__events-list", "div.hdo__event-type-locations", ".cb-accordion-item__content"]
    , "Crownbet/racing-betting/": ["span.ar-day-filter-btn__inner-text", "div.ntj__events-list", ".bv-nextup-race__title", "div.ar-tables"]
    , "Crownbet/racing-betting/horse-racing/today/": ["span.ar-day-filter-btn__inner-text", "div.ntj__events-list", ".bv-nextup-race__title", "div.ar-tables"]
};

const clickSelectorsArray = {
    "Crownbet/": ["button[class='hdo__event-type-expand-collapse'] span", "button[class='bv-close-button']"]
    , "Crownbet/racing-betting/": ["button[class='bv-close-button']"]
    , "Crownbet/my-account/": [".ln-menu__item--featured button", "button[class='bv-close-button']"]
    , "Crownbet/racing-betting/horse-racing/today/": ["button[class='bv-close-button']"]
};

let scenarios = [];

console.log(chalk.green("Pages being tested:"));

module.exports = {

    scenarios: function () {
        for (let k = 0; k < paths.length; k++) {
            let label = "Crownbet" + paths[k];
            let hide = [];
            let remove = [];
            let clickSel = "";
            let engine_script = "";

            for (let h in hideSelectorsArray) {
                if (h === label) {
                    hide = hideSelectorsArray[h];
                }
            }

            for (let sel in clickSelectorsArray) {
                if (sel === label) {
                    clickSel = clickSelectorsArray[sel];
                }
            }

            for (let eS in onReadyScriptsArray) {
                if (eS === label) {
                    engine_script = onReadyScriptsArray[eS];
                }
            }

            for (let rs in remSelectorsArray) {
                if (rs === label) {
                    remove = remSelectorsArray[rs];
                }
            }

            console.log(chalk.yellow(args.BS_TESTHOST + paths[k]));

            scenarios.push(
                {
                    "label": label,
                    "cookiePath": "backstop_data/engine_scripts/cookies.json",
                    "url": args.BS_TESTHOST + paths[k],
                    "referenceUrl": args.BS_REFHOST + paths[k],
                    "onBeforeScript": config.CUSTOM_SCRIPTS_PATHS + "onBefore.js",
                    "onReadyScript": engine_script,
                    "delay": 0,
                    "postInteractionWait": 5000,
                    "clickThis": clickSel,
                    "hideSelectors": hide,
                    "removeSelectors": remove,
                    "selectors": selectorsArray[k],
                    "selectorExpansion": false,
                    "misMatchThreshold": 1,
                    "requireSameDimensions": false
                }
            );
        }
        return scenarios;
    }

};