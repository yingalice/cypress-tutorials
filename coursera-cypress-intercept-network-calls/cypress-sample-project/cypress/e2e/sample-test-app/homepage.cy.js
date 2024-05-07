// Helpful example:
// https://github.com/cypress-io/cypress-example-recipes/blob/11647775546f106b8355dc088934bc2c4325eaaa/examples/logging-in__jwt/cypress/e2e/spec.cy.js

/// <reference types="cypress" />

describe("Verify Conduit add article feature", () => {
  let user;
  
  before(() => {
    cy.request({             // Use API to provide login credentials
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
      user = res.body.user;  // Save response, so it can be used to set authorization cookies/local storage
      return user;
    })
    .then(user => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/profiles/' + user.username
      })
      .then(res => {
        user.effectiveImage = res.body.profile.image;  // Get profile pic
      })  
    })
  })

  beforeEach(() => {
    cy.setCookie('auth', user.token);  // Set cookies
    cy.visit("http://localhost:3000", {
      onBeforeLoad(win) {
        // and before the page finishes loading
        // set the user object in local storage
        win.localStorage.setItem('user', JSON.stringify(user));
      },
    })
    // the page should be opened and the user should be logged in
  })

  it("Intercept GET tags call", () => {
    cy.intercept({         // Intercept network call for tags
      method: 'GET',
      url: '**/api/tags',
    }, {
      fixture: "tags"      // Mock response with desired article tags, see tags.json
    })
    cy.reload();
    cy.get('.tag-pill').should('contain', 'cypress').and('contain', 'selenium').and('contain', 'katalon studio');
  })

  it("Add Article and update request", () => {
    cy.intercept({
      method: 'POST',
      url: '**/api/articles',
    }, (request) => {
      // Modify request with new description
      request.body.article.description = "This is a modified request description";
    }).as("postArticle")

    cy.contains('New Article').click();
    cy.get('[placeholder="Article Title"]').type('Article on Cypress');
    cy.get('[placeholder="What\'s this article about?"]').type('Cypress topic');
    cy.get('[placeholder="Write your article (in markdown)"]').type('Article Details');
    cy.get('[placeholder="Enter tags"]').type('Test Automation').type('{enter}');
    cy.get('button[type="button"]').click();

    // Get the request/response, and verify it was changed
    cy.wait("@postArticle");
    cy.get("@postArticle").then(xhr => {
      cy.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.request.body.article.description).to.equal("This is a modified request description");
      expect(xhr.response.body.article.description).to.equal("This is a modified request description");
    })
  })

  it("Add Article and update response", () => {
    cy.intercept({
      method: 'POST',
      url: '**/api/articles',
    }, (request) => {
      // Modify response with new description
      // .reply controls the response to this request
      request.reply(response => {
        response.body.article.description = "This is a modified response description";
      })
    }).as("postArticle")

    cy.contains('New Article').click();
    cy.get('[placeholder="Article Title"]').type('Article on Cypress');
    cy.get('[placeholder="What\'s this article about?"]').type('Cypress topic');
    cy.get('[placeholder="Write your article (in markdown)"]').type('Article Details');
    cy.get('[placeholder="Enter tags"]').type('Test Automation').type('{enter}');
    cy.get('button[type="button"]').click();

    // Get the response, and verify it was changed
    cy.wait("@postArticle");
    cy.get("@postArticle").then(xhr => {
      cy.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.body.article.description).to.equal("This is a modified response description");
    })
  })
})