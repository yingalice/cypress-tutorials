// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

Cypress.Commands.add('getIframe', (iframe) => {
  return cy.get(iframe)
    .its('0.contentDocument.body')
    .should('not.be.undefined')
    .wait(20)
})

/**
 * Custom command - Click link using label
 */
Cypress.Commands.add('clickLink', (label) => {
  const regex = new RegExp('^' + label + '$')
  cy.contains(regex).click();
})

/**
 * Overwrite existing .contains()
 */
Cypress.Commands.overwriteQuery('contains', function (originalFn, selector, text, options = {}) {
  options.matchCase = false
  return originalFn.bind(this)(selector, text, options)
})

/** 
 * Custom command for login
 */
Cypress.Commands.add('loginApp', (username, password) => {
  cy.get('input#username').type(username)
  cy.get('input#password').type(password)
  cy.get('button#submit').click()
})