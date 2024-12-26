# Cypress - JavaScript End to End Testing(2022 Series)

## About
- Course: [Cypress - JavaScript End to End Testing(2022 Series)](https://www.youtube.com/playlist?list=PLUDwpEzHYYLvA7QFkC1C0y0pDPqYS56iU)
- Instructor: [SDET-QA](https://www.youtube.com/@sdetpavan)

## Setup
- Create package.json: `npm -i init`
- Install cypress: `npm install cypress --save-dev`

## Reusable scripts in `support`
- `commands.js` - Custom commands / Overwrite existing commands
  - For Intellisense: `/// <reference types="cypress" />`
- `e2e.js` - Ran before tests
  - For Intellisense: `import './commands'`

## Run Options
- `npx cypress open` > E2E testing > Start > Specs tab > Click on your test
- `npx cypress run` (headless)
- `npx cypress run --headed` (headed)
- `npx cypress run --spec cypress/e2e/MyFirstTest.cy.js` (specific test)
- `npx cypress run --browser chrome` (specific browser)

## Installing plugins example
```
npm install -D cypress-iframe
import 'cypress-iframe'  // put in cypress/support/commands.js
```

## Xpath (DEPRECATED)
- Install: `npm install -D cypress-xpath`
- Add to `e2e/support/commands.js`: `/// <reference types="cypress-xpath" />`
- Add to `e2e/support/e2e.js`: `import 'cypress-xpath'`

## Assertions
- Main chainers: `eq`, `include`, `exist`, `have.length`, `have.value`, `not`
- Implicit assertions (built-in):
  - `.should()` / `.and()` (aliases)
    - `cy.get("#result").should("have.text", "You clicked: Ok")`
- Explicit assertions (write user-defined functions):
  - `.expect()`
    - `expect(actualName).to.equal(expectedName)`

## Get
- `.get()` uses CSS. 
  - nth element (1 based): CSS example `li:nth-child(n)`
  - nth element (0 based): Chainer `.eq(n)`
- Search inside Shadow DOM: `cy.get('.smart-browse-input', {includeShadowDom:true})`
## Supress fetch/xhr from log (spammy)
- Add this in `support/e2e.js` (global) or in `.cy.js` (individual tests level)
```
beforeEach(() => {
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})
```

## Tips
  ### Custom commands
  - Define in `support/commands.js`
    - `.add()`
      ```
      Cypress.Commands.add('fnName', (parameters) => {
        ...
      })
      ```
    - `.overwrite()` or `.overwriteQuery()`
      ```
      Cypress.Commands.overwriteQuery('contains', function (originalFn, parameters) {
        ...
        return originalFn.bind(this)(parameters)
      })
      ```
  - Usage: `cy.fnName()`
  ### Environment variables
  - `Cypress.env(<key>)` can read from `cypress.env.json`
  ### Check if item exists before clicking
  - Respect asynchronous nature of Cypress
  - Here, the $body variable is already resolved as you're in .then() part of the promise, so can check for button existence
  ```
  cy.get('body').then($body => {
    if ($body.find("button.frb-header-minimize").length > 0) {
      cy.get("button.frb-header-minimize").click()
    }
  })
  ```
  ### Convert Jquery element `$el` to Cypress element using `cy.wrap($el)`
  - Can use Cypress methods
    ```
      cy.get("span").filter(':visible').each(($el, index, $list) => {
        if($el.text() === 'cypress automation tool') {
          cy.wrap($el).click()
        }
      })
    ```
  ### Hooks:
  - `beforeEach('Login', () => {})` - Runs before each test
  ### Extract text:
  ```
  cy.get(".text-end").then(($e) => {
    const myText = $e.text()  // Showing 1 to 10 of 11047 (1105 Pages)

    // IndexOf approach:
    totalPages = myText.substring(myText.indexOf("(") + 1, myText.indexOf("Pages") - 1);

    // Regex approach:
    const regex = /\((.*) Pages\)/
    totalPages = myText.match(regex)[1]
  })
  ```
  ### Cypress simulated events - workarounds
  - Cypress default events, like .click and .type are simulated using JS, and may behave differently
  - Workarounds: 
    - Use [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events)
    - Couldn't close custom context menu with a click, so used 'Escape'
      - `cy.get('body').type('{esc}')`
  - ### Set timeout at the suite level
    -  `describe('Handle Tables', { defaultCommandTimeout: 30000 }, () => {...`
  ### Verify title matches
  - `cy.title().should('eq', 'Test Login')`

## Useful Methods
- `.its()` - Get property value
  - `cy.get('td').its('length').then((size) => {...})`
- `.contains()` - Text locator, searches descendants.  Can use regex to get exact matches
  - `cy.contains("td", /^E-Mail$/).click()`
- `.invoke()` - Call function
  - `cy.get("img").invoke("attr", "alt")`
  - 
    ```
    const regex = new RegExp('^' + label + '$', 'i')  // Case insensitive
    cy.get('h1.text-center').invoke('text').should('match', regex)
    ```
- `.within()` - Subsequent commands are scoped to this element
- `.each()` - Iterate thru array like structure
  ```
  cy.get(`table > tbody > tr`).each(($row, rowIndex, $rows) => {
    cy.wrap($row).within(() => {})
  })
  ```

## Checkboxes / Radio Buttons
- Can check single or multiple elements at once:
  - Check: `cy.get("input#checkbox1").check().should('be.checked')`
  - Uncheck: `cy.get("input#checkbox1").uncheck().should('not.be.checked')`

## Dropdowns
- `<select>` dropdowns (`have.value`): 
  ```
  cy.get('#zcf_address_country').select("Italy").should('have.value', 'Italy')
  ```
- non `<select>` dropdowns (`have.text`):
  ```
  cy.get(".select2-search__field").type("Italy{enter}")
  cy.get("#select2-billing_country-container").should('have.text', 'Italy')
  ```

## Alerts
- By default, Cypress automatically clicks "OK" for alerts
- Use [events](https://docs.cypress.io/api/cypress-api/catalog-of-events) to:
  - Check alert text
  - Click "Cancel" using `return false`
  ```
  cy.get("button[onclick='jsConfirm()']").click()

  cy.on('window:confirm', (t) => {
    expect(t).to.equal("I am a JS Confirm")
    return false
  })
  ```
- Enter prompt alert text:
  ```
  cy.window().then((win) => {
    cy.stub(win, 'prompt').returns('Welcome!')
  })
  
  cy.get("button[onclick='jsPrompt()']").click()
  ```
- Basic authenticated alert:
  - Credentials as parameter: ```cy.visit('https://the-internet.herokuapp.com/basic_auth', { auth: {username: Cypress.env("username"), password: Cypress.env("password")}})```
  - Credentials in URL: ```cy.visit(`https://${Cypress.env("username")}:${Cypress.env("password")}@the-internet.herokuapp.com/basic_auth`)```

## New Tab
- Cypress does not support multi-tabs
- Approach 1: Remove target attribute, so new page loads on same window
  ```
  cy.get("div.example > a").invoke('removeAttr', 'target').click()
  ```
- Approach 2: Use href link in cy.visit (only works if same domain)
  ```
    cy.get("div.example > a").then( ($e) => {
      const newURL = $e.prop('href')
      cy.visit(newURL)
    })
  ```
- Go back to original page:
  ```
  cy.go('back')
  ```

## iFrames
  - Approach 1: Code
    ```
    const iframe = cy.get("iframe")
                    .its('0.contentDocument.body')
                    .should('not.be.undefined')
                    .then(cy.wrap)
    ```
  - Approach 2: Use [cypress-iframe](https://www.npmjs.com/package/cypress-iframe) plugin
    - `frameLoaded` - Check iframe is loaded
      - `cy.frameLoaded('#my-frame')`
    - `iframe` - Subsequent commands are executed inside iframe
      - `cy.iframe('#my-frame').find('.some-button').should('be.visible').click()`
    - `enter` - Execute group of commands in iframe
      ```
      cy.enter('#my-iframe').then(getBody => {
        getBody().find('.some-button').should('be.visible').click()
        getBody().contains('Some hidden element').should('not.be.visible')
      })
      ```

## Tables
  - Read cols and rows
  ```
  cy.get(`table > tbody > tr`)
    .each(($row, rowIndex, $rows) => {
      cy.wrap($row).within(() => {
        cy.get("td").each(($col, colIndex, $cols) => {
          cy.log(rowIndex + "," + colIndex + ":" + $col.text())
        })
      })
    })
  ```

## Mouse Operations
- Right click: `.rightclick()`
- Double click: `.dblclick()`
- Hover: `.trigger('mouseover')`
- Drag and drop:
  - Install plugin: `npm install --save-dev @4tw/cypress-drag-drop`
  - 
    ```
    cy.get(".dragableBox").drag("#box106", {force: true})
    cy.get("#box106").trigger('mouseup', {force: true}) // .drag() should handle mouseup, but didn't
    ```
- Scroll:
	- `.scrollIntoView({duration: 50})`

## File Upload
- Install plugin: `npm install --save-dev cypress-file-upload`
- File needs to be inside `fixtures` folder
- Attach 1 file: `.attachFile('file1.txt')`
- Attach multiple files: `.attachFile(['file1.txt', 'file2.txt'])`
- Attach via drag and drop: `.attachFile('file1.txt', {subjectType: 'drag-n-drop'})`
- Attach and rename: `.attachFile({filePath:'file1.txt', fileName:'new_file1.txt'})`

## Hooks
- `before()` - Run before tests
- `after()` - Run after tests
- `beforeEach()` - Run before each test
- `afterEach()` - Run after each test

## Tags
- `it.skip()` - Skip selected cases (note: before/after doesn't run if skipping the first/last case)
- `it.only()` - Run selected cases

## Fixtures
- Basic case:
  - fixtures/orangehrm.json:
    ```
    {
      "username": "Admin",
      "password": "admin123",
    }
    ```
  - Fixtures.cy.js:
    ```
    cy.fixture('orangehrm.json').then((data) => {
      cy.get('#username').type(data.username)
      cy.get('#password').type(data.password)
    })
    ```
- If fixture needs to be used in multiple tests, add to `.before()`:
  ```
  let userdata
  before(() => {
    cy.fixture('orangehrm').then((data) => {
      userdata = data;
    })
  })
  ```
- If same test needs to be repeated with different fixture data:
  - fixtures/orangehrm2.json:
    ```
    {
      "logins": [
        {
          "username": "Admin",
          "password": "admin123",
        },
        {
          "username": "xyz",
          "password": "admin123",
        },
      ]
    }
    ```
  - Fixtures.cy.js:
    ```
      import { logins } from '../fixtures/orangehrm2.json'

      logins.forEach((userdata) => {
        // Multiple tests created
        it('Fixture Tests', () => {
            cy.visit('https://opensource-demo.orangehrmlive.com')
            cy.get("input[placeholder='Username']").type(userdata.username)
        })
      })
    ```

- Navigation
  - `cy.go('back')`
  - `cy.go(-1)`
  - `cy.go('forward')`
  - `cy.go(1)`
  - `cy.reload()`

- Screenshots and Videos
  - Screenshot (`cypress/screenshots` folder)
    - If CLI (npx cypress run): failed screenshots are saved automatically
    - If UI (npx cypress open): screenshots are only saved if explicitly instructed
      - Full page:  `cy.screenshot('homepage', {overwrite: true})`  // homepage.png
      - Specific element:  `cy.get('#logo').screenshot('opencart-banner', {overwrite: true})`  // opencart-banner.png
  - Videos (`cypress/videos` folder)
    - Not enabled by default.  If enabled, will only capture videos in CLI
    - To enable video capture on failure, add this to `cypress.config.js`:
      ```
      const _ = require('lodash')
      const fs = require('fs')
      module.exports = defineConfig({
        e2e: {
          video: true,
          setupNodeEvents(on, config) {
            on('after:spec', (spec, results) => {
              if(results.video) {
                const failures = _.some(results.tests, (test) => {
                  return test.state == 'failed'
                })
                if (!failures) {
                  fs.unlinkSync(results.video)  // Delete video if all tests pass
                }
              }
            })
          },
        },
      });
      ```
- Reports
  - Only works in CLI mode (`npx cypress run --spec <spec.cy.js>`)
  - `npm install --save-dev cypress-mochawesome-reporter`
  - `cypress.config.js`:
    ```
    const { defineConfig } = require('cypress');

    module.exports = defineConfig({
      reporter: 'cypress-mochawesome-reporter',
      reporterOptions: {
        reportFilename: "[status]_[datetime]-[name]-report",
        videoOnFailOnly: true,
        overwrite: false,
      },
      e2e: {
        setupNodeEvents(on, config) {
          require('cypress-mochawesome-reporter/plugin')(on);
        },
      },
    });
  ```
- `support/e2e.js`:
  - `import 'cypress-mochawesome-reporter/register'`

## Page Object Model
- Page elements and actions are in a separate file from test scripts
- Benefits:
  - Avoids element duplication
  - Easier maintenance
- `POMLogin.cy.js`:
  ```
  import Login from '../PageObjects/LoginPage'

  const loginPage = new Login()
  loginPage.setUserName('Admin')
  ```
- `PageObjects/LoginPage.js`:
  ```
  class Login {
    txtUserName = "input[placeholder='Username']"
    setUserName(username) {
      cy.get(this.txtUserName).type(username)
  }
  export default Login
  ```
  