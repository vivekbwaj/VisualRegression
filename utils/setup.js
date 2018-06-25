const config = require("../config.js");
let args = config.ARGS;

class setup {

    constructor() {
        this.setEnv();
        this.setRef();
        this.setTestHost();
        this.setOptimizely();
    }

    setPath() {
        if (args.BS_PATHSFILE) {
            let pathConfig = require("../tests/" + args.BS_PATHSFILE + ".js"); // use paths.js file
            return pathConfig.array;
        } else if (args.PATHS) {
            let pathString = args.PATHS; // pass in a comma-separated list of paths in terminal
            return pathString.split(",");
        } else {
            return config.DEAFAULT_PATHS; // keep with the default of just the homepage
        }
    }

    // Environments that are being compared
    setEnv() {
        if (!args.BS_ENV)
            args.BS_ENV = config.DEFAULT_ENVIRONMENT;
        // if you pass in a bogus environment, it’ll still use the default environment
        else if (!config.ENVIRONMENTS.hasOwnProperty(args.BS_ENV))
            args.BS_ENV = config.DEFAULT_ENVIRONMENT;

    }

    setRef() {
        // Site for reference screenshots
        args.BS_REFHOST = (!args.BS_REFHOST) ? config.ENVIRONMENTS[args.BS_ENV] : config.ENVIRONMENTS[args.BS_REFHOST];

    }

    setTestHost() {
        // Site for test screenshots
        args.BS_TESTHOST = (!args.BS_TESTHOST) ? config.ENVIRONMENTS[args.BS_ENV] : config.ENVIRONMENTS[args.BS_TESTHOST];

    }

}

module.exports = new setup();