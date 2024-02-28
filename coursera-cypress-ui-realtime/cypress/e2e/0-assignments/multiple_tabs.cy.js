/// <reference types="cypress" />

describe("Multiple window handle", () => {
  beforeEach(() => {
    cy.visit("https://test.qatechhub.com/window-handling/");
  })

  it("TC#1 - Verify href and target attribute", () => {
    cy.contains("a", "Click Here").as("button");
    cy.get("@button").should("have.attr", "href", "https://qatechhub.com")
    cy.get("@button").should("have.attr", "target", "_blank");
  })

  it("TC#2 - Navigate to target page by removing attr", () => {
    cy.contains("a", "Click Here").as("button");
    cy.get("@button").invoke("removeAttr", "target").click();
    cy.url().should("equal", "https://qatechhub.com");
  })
})