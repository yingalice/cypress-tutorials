/// <reference types="cypress" />

describe("Hooks in Cypress", () => {
  before(() => {
    cy.log("First method to execute");
  })

  after(() => {
    cy.log("Last method to execute");
  })

  beforeEach(() => {
    cy.log("Before each TC");
  })

  afterEach(() => {
    cy.log("After each TC");
  })

  it("Test Case #1", () => {
    cy.log("Test Case #1");
  })

  it("Test Case #2", () => {
    cy.log("Test Case #2");
  })

  it("Test Case #3", () => {
    cy.log("Test Case #3");
  })
})

// First method to execute
// Before each TC
// Test Case #1
// After each TC
// Before each TC
// Test Case #2
// After each TC
// Before each TC
// Test Case #3
// After each TC
// Last method to execute