/// <reference types="cypress" />

describe("Form Elements", () => {
  beforeEach(() => {
    cy.visit("https://test.qatechhub.com/form-elements/");
  })

  it("Form Element Test", () => {
    cy.get("#wpforms-49-field_1").type("Alice");
    cy.get(".wpforms-field-name-last.wpforms-field-required").type("Ying");
    cy.get("input[type='email']").type("aliceying@fake.com");
    cy.get("#wpforms-49-field_4").type("1234567890");
    cy.get("input[value='Female']").check();
    cy.get("#wpforms-49-field_5").select("Cypress");
    cy.contains("button", "Submit").click();

    cy.get("#wpforms-confirmation-49").first("p").should("contain", "You have successfully filled in the form!");
  })
})