/// <reference types="cypress" />

describe("IFrame and Drag and Drop operation", () => {
  beforeEach(() => {
    cy.visit("https://jqueryui.com/droppable/");
  })

  it("Drag and Drop with IFrame", () => {
    // Drag and drop source box onto target box, and verify it says "Dropped!"
    cy.get(".demo-frame").then($frame => {
      cy.wrap($frame.contents()).find("#draggable").as("source");
      cy.wrap($frame.contents()).find("#droppable").as("target");
    })

    cy.get("@source").trigger("mousedown", {which: 1})  // which: 1 is left mouse button
    cy.get("@target").trigger("mousemove").trigger("mouseup", {force: true});  // force: true forces the action when another element is covering it
    cy.get("@target").should("contain", "Dropped!");
  })
})