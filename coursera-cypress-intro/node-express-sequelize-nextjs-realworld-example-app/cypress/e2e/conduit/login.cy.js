/// <reference types='cypress' />

// describe('Signup page tests', () => {
//   // Create an account, only needs to run once, so commented out
//   it('Create an account', () => {
//     cy.visit('/');
//     cy.contains('a', 'Sign up').click();
//     cy.get('input[placeholder="Username"]').type('Alice');
//     cy.get('input[placeholder="Email"]').type('alice@fake.com');
//     cy.get('input[placeholder="Password"]').type('admin');
//     cy.get('button[type="submit"]').click();
//     cy.url().should('equal', Cypress.config().baseUrl + "/");
//   })
// })

describe('Login page test cases', () => {
  before(function login() {
    // Navigate to URL, and click on 'Sign in' link
    cy.visit('/');
    cy.contains('a', 'Sign in').click();

    // Get web element by CSS Selector, type email/password, click button
    cy.get('input[type="email"]').type('alice@fake.com');
    cy.get('input[type="password"]').type('admin');
    cy.get('button[type="submit"]').click();
    cy.get('a.nav-link[href^="/profile"]').should('have.text', 'alice');
  })

  it('Add articles', () => {
    const articleTitle = "Welcome to Illusion Pro";
    cy.contains('a', 'New Article').click();
    cy.url().should('equal', Cypress.config().baseUrl + '/editor');
    cy.get('[placeholder="Article Title"]').type(articleTitle);
    cy.get('[placeholder="What\'s this article about?"]').type('Getting started');
    cy.get('a.nav-link[href^="/profile"]').then((profileName) => {
      cy.get('[placeholder="Write your article (in markdown)"]').type('Hello, welcome ' + profileName.text() + "!  " + 
      'To get started, remove the clear plastic film covering the device, then press the power button, and follow the on screen instructions for setup');
    })
    cy.get('[placeholder="Enter tags"').type('welcome, start, setup');
    cy.screenshot({blackout: ['input[placeholder="What\'s this article about?"]']});
    cy.contains('button', 'Publish Article').click();
    cy.url().should('contain', Cypress.config().baseUrl + '/article/');
    cy.get('h1').should('have.text', articleTitle);
  })
})