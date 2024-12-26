/// <reference types="cypress" />

describe('Handle tabs', () => {
  it('Approach 1 - Remove target attribute ', () => {
    const orgURL = "https://the-internet.herokuapp.com/windows"
    const newURL = "https://the-internet.herokuapp.com/windows/new"

    cy.visit(orgURL)  // parent tab
    cy.get("div.example > a").invoke('removeAttr', 'target').click()  // click link after removing target attribute
    cy.url().should('eq', newURL)  // child page opens in same tab

    // ... perform some operations on the child page ...

    cy.go('back')  // go back to parent page
    cy.url().should('eq', orgURL)
  })

  it.only('Approach 2 - Use href link in cy.visit', () => {
    // This approach only works when the domain is the same!

    const orgURL = "https://the-internet.herokuapp.com/windows"

    cy.visit(orgURL)  // parent tab
    cy.get("div.example > a").then( ($e) => {
      const newURL = $e.prop('href')
      cy.visit(newURL)
      cy.url().should('eq', newURL)
    })
    
    cy.get('h3').should('have.text', "New Window")
    cy.go('back')  // go back to parent page
    cy.url().should('eq', orgURL)
  })
})