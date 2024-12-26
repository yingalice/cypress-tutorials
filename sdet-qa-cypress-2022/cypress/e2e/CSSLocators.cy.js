// Website doesn't work anymore
describe('CSSLocators', () => {
  it("csslocators", () => {
    cy.visit("http://automationpractice.com/index.php")
    // cy.get("#search_query_top").type("T-Shirts")                     // id
    // cy.get(".search_query").type("T-Shirts")                         // class
    // cy.get("[name='search_query']").type("T-Shirts")                 // attribute
    cy.get("input.search_query[name='search_query']").type("T-Shirts")  // tag, class, and attribute
    cy.get("[name='submit_search']").click()                            // attribute
    cy.get(".lighter").contains("T-Shirts")                             // Assertion
  })
})