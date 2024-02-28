/// <reference types="cypress" />

describe("Amazon Project", () => {
  beforeEach(() => {
    cy.visit("https://amazon.com");
  })

  it("Search Product", () => {
    cy.get("#searchDropdownBox").select("Electronics", {force: true});
    cy.get("#twotabsearchtextbox").type("Apple watch");
    cy.get("#nav-search-submit-button").click();

    // .eq(5) gets 5th index element in 0-index array of elements
    // .then() is like a JS Promise, save the text you got into productText variable
    cy.get("[data-component-type='s-search-result']").as("products");
    cy.get("@products").eq(5).invoke('text').then(productText => {
      cy.log(productText);
    });

    cy.get('@products').each(($el, index, $list) => {
      // $el -- value.  Wrapped jQuery element
      // index -- index
      // $list -- collection
      cy.wrap($el).scrollIntoView();  // Cypress command
      cy.log("Index : " + index + " and the product is " + $el.text());  // jQuery command
    })

    // cy.get("@products").eq(5).click();
  })
})