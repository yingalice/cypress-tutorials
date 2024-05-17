=== Course ===
- [Cypress API test automation for absolute beginners](https://www.coursera.org/projects/cypress-api-test-automation-for-absolute-beginners) from Coursera Project Network (instructor: Saurabh Dhingra)

=== Repository ===
- Learn Cypress by automating the web app from [node-express-sequelize-nextjs-realworld-example-app](https://github.com/cirosantilli/node-express-sequelize-nextjs-realworld-example-app)
  - `git clone git@github.com:cirosantilli/node-express-sequelize-nextjs-realworld-example-app.git`
  - `npm install --legacy-peer-deps`

=== Learning Objectives ===
- Introduction to Cypress, API Testing and environment setup
- Create your first test case and send a GET request
- Send a GET request (cont)
- Send a POST request
- Send a PUT request
- Send a DELETE request
- Optimize the code
- Generating reports

=== Notes ===
- Application Programming Interface (API) - Helps 2 independent systems communicate with each other
- Web Service - When API communicates over the web
- Representational State Transfer (REST API) - API that follows the architectural style/rules of REST, where the request/response is presented in a representational form (ie. JSON/XML)
- APIs are built first, then integrated with front-end UI.  Do API testing first to find bugs early.
- CRUD Operations
  - POST (Create)
  - GET (Read)
  - PUT (Update/replace entire resource)
  - PATCH (Update a portion, without sending entire body)
  - DELETE (Delete)
- Status Codes
  - 1xx - Informational - Request received
  - 2xx - Success - Received and accepted
  - 3xx - Redirection - Further action needed
  - 4xx - Client error - Incorrect syntax or cannot be fulfilled
  - 5xx - Server error - Failed to fulfill a valid request
- `cy.request()` is used to send all API requests, it's asynchronous by default
- Chai assertion `expect(response.status).to.equal(200)` validates status code

- Optimize code with custom commands and reusable snippets
  - Custom commands:
    - Add to `cypress\support\commands.js`
      ```
      // Create a custom command to login.  Save the token as an env/global variable
      Cypress.Commands.add('loginToApplication', (email, password) => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:3000/api/users/login',
          body: 
          {
            "user": {
              "email": email,
              "password": password
            }
          }
        }).then(response => {
          expect(response.status).to.equal(200);
          Cypress.env('token', response.body.user.token);
        })
      })
      ```
  - Reusable code:
    - Move to `cypress\support\restClient.js`
      ```
        export class RestClient {
          sendGetRequest(apiUrl) {
            return cy.request({
              method: 'GET',
              url: apiUrl
            })
          }
        }

      export const restClient = new RestClient();
      ```
    - Use both optimizations in test code:
    ```
      import {restClient} from '../../support/restClient'

      describe('API Testing of Conduit App', function () {
        let token;

        // Before every test case, login and save the authorization token
        beforeEach(() => {
          // Use custom command from support/commands.js
          cy.loginToApplication('alice@fake.com', '12345');
          token = Cypress.env('token');
        });

        // Get all article tags
        it('GET Tags API', () => {
          // Use custom function from support/restClient.js
          restClient.sendGetRequest('http://localhost:3000/api/tags')
            .then((response) => {
              cy.log(JSON.stringify(response));
              expect(response.status).to.equal(200);
              expect(response.body.tags).to.contain('cypress');
            });
        });
      })
    ```
- Generating Reports
  - Cypress is based on Mocha, so their reports work: `npm install mochawesome --save-dev`
  - Configure in `cypress.config.js`
    ```
    reporter: "mochawesome",
    reporterOptions: {
      reportFilename: "[name]-[datetime].xml",
      quiet: true
    }
    ```
  - Must execute in headless mode: `npx cypress run`