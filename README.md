### **Visual Regression using** [BackstopJS](https://github.com/garris/BackstopJS)

#### Purpose
We tend to use UI tests more sparingly.What if we could automate some visual testing which could pick up visual changes to our software? No longer just checking elements and text have been rendered on our web applications with typical UI automated tests, but comparing what our page looks like and what we expect it to look like.

#### Installation and BackstopJS commands:
- User should have nodejs installed
- Go to the root directory > crownbet.visualregression  `npm install` . This installs the dependencies from package.json file
- To capture reference image from production `npm run prod-reference`

Similarly other scripts can be run as `npm run scriptname`. 'scriptname' are mentioned in package.json file.

#### Backstop configuration files:
- config.js: This file contains the values for stuff like where the snapshots/reports will be stored, which all environments will be tested, command line arguments to be passed to npm scripts
- node backstop.js : This is the core of the BackstopJS framework.When the npm scripts are run backstopJS looks for this file and starts building up the structure for the tests to run. This file contains backstop requirements of:
 - viewports:Screen sizes to be used
 - engine to run tests on. **puppeteer** being default 

#### Directories:
- tests : This directory contains path.js and test.js
  - path.js : ** This is the first step ** to writing visual regression tests. `pathConfig.array` contains path of the pages we will be testing. These paths get appended to the  hostname(for different environments).
  - tests.js : This file contains the tests in the form of different sections. The sections mentioned below comprise a test scenario:
    - selectorsArray: Array of selectors to capture.
    - hideSelectorsArray: Array of selectors set to visibility: hidden.
    - onReadyScriptsArray: Use this script to perform modify UI state prior to screen shots e.g. navigations, fill forms etc
    - clickSelectorsArray: Contains css selectors that are to be clicked before capturing and hiding takes place.
    ** The second step ** would be to enter the requisite css selectors in the arrays above.
- utils : Contains setup.js file thats picks up parameters specified in config.js file and initializes environments that are being compared.
- backstop_data: This directory contains:
    ├───engine_scripts 
    │   └───puppet
    ├───engine_Scripts_Screenshots
    ├───prod_ci_report
    ├───prod_html_report
    ├───prod_reference
    ├───prod_test
    └───uat_reference

    - environmentUnderTest_reference directories will contains reference images
    - environmentUnderTest_test will contains test images as well as images showing the mismatch
    - environmentUnderTest_ci/html_report contain junit format and html reports respectively
    - engine_sripts > puppet contains scripts such as enReadyScripts/onBeforeScripts. All the helper/reusable methods for page navigation will be here in puppet directory.
    - engine_Scripts_Screenshots: Will contains the custom snapshots that user could capture through these enReadyScripts/onBeforeScripts.
 - EsLint: Contains .eslintrc.js thata analyse the static codes based on rules. Before commit run "npm run lint" this will show the errors need to be addressed and to ignore add it to package to json or create a custom rule.
 - package.json:
    - prod-test: Run test for prod environment
    - prod-reference: Capture reference images fresh from start, overrides existing files
    - prod-approve: Update reference images by copying missing images. Basically copies new images captured from the last prod-test to prod reference directory
    

For basic tutorials follow [AUTOMATION TIPSNTRICKS](http://automationtipsntricks.blogspot.com/search/label/BackstopJS)