=== Course ===
- [Cypress end to end testing and intercepting network call](https://www.coursera.org/projects/cypress-end-to-end-testing-and-intercepting-network-call) from Coursera Project Network (instructor: Saurabh Dhingra)

=== Repository ===
- Learn Cypress by automating the web app from [node-express-sequelize-nextjs-realworld-example-app](https://github.com/cirosantilli/node-express-sequelize-nextjs-realworld-example-app)
  - `git clone git@github.com:cirosantilli/node-express-sequelize-nextjs-realworld-example-app.git`
  - `npm install --legacy-peer-deps`

=== Learning Objectives ===
- Introduction to end-to-end testing via Cypress and environment setup
- First end-to-end test automation scenario
- Intercepting GET call
- Intercepting POST call
- Updating a request via intercepting HTTP requests
- Updating a response via intercepting

=== Notes ===
- Cypress controls entire automation process
  - Access to frontend and backend, inside and outside browser
    - Cypress has a node server process, which acts as a proxy to all HTTP requests
    - Cypress and the node process constantly communicate, synchronize, and perform tasks on behalf of each other
  - Native access to every host object
  - Operates on network layer by reading and altering web traffic
  - Creates states artificially (ie. 500 response that's difficult to mimic)
  - Modifies DOM elements dynamically (ie. force hidden elements to be shown)
  - Intercept network calls and update their response
  - Cypress does not force you to act like a user
    - Don't have to use UI to build up the state.  Can take shortcuts and use the API to login or search products.  Then you can perform your real test using UI.
    - `cy.request()` is used to send a HTTP request directly
      - Can be synchornized with browser via cookies
      - To login: Call API, take token, store it in Cookies/Local Storage, just like the browser does
    - `cy.intercept()` to intercept and mock the response
      - Good for edge cases: 500 status code, empty responses, complex/large data set
      - Mock response with a .json file inside the `fixtures` folder
      ```
      before(() => {              
        cy.request({            // Use API to provide login credentials
          method: 'POST',
          url: 'http://localhost:3000/api/users/login',
          body : {
            "user": {
              "email": "alice@fake.com",
              "password": "12345"
            }
          }
        })
        .then(res => {
          user = res.body.user;  // Save response
        })
      })

      beforeEach(() => {
        cy.setCookie('auth', user.token);                            // Set cookies
        cy.visit("http://localhost:3000", {
          onBeforeLoad (win) {                                       // Before page finishes loading
            win.localStorage.setItem('user', JSON.stringify(user));  // Set local storage, so user is logged in
          },
        })
      })

      it("Intercept GET tags call", () => {
        cy.intercept({                                               // Intercept network call
          method: 'GET',
          url: '**/api/tags',
        }, {
          fixture: "tags"                                            // Mock response with desired article tags, see tags.json
        })
        cy.reload();
        cy.get('.tag-pill').should('contain', 'cypress').and('contain', 'selenium').and('contain', 'katalon studio');
      })
      ```
      - Mock response inside code
      ```
      it("Add Article and update response", () => {
        cy.intercept({
          method: 'POST',
          url: '**/api/articles',
        }, (request) => {
          // Modify response with new description
          // .reply() controls the response to this request
          request.reply(response => {
            response.body.article.description = "This is a modified response description";
          })
        }).as("postArticle")

        cy.contains('New Article').click();
        cy.get('[placeholder="What\'s this article about?"]').type('Cypress topic');
        cy.get('button[type="button"]').click();

        // Get the response, and verify it was changed
        cy.wait("@postArticle");
        cy.get("@postArticle").then(xhr => {
          cy.log(xhr);
          expect(xhr.response.statusCode).to.equal(200);
          expect(xhr.response.body.article.description).to.equal("This is a modified response description");
        })
      })
      ```
  - Dev Tools:
    - Network tab - Click Fetch/XHR to see API call
    - Application tab - Token (tells browser whether user is logged in) is usually stored in Local Storage or Cookies