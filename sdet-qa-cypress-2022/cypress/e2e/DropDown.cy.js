describe("Handle dropdowns", () => {
  it("dropdown with select tag", () => {
    cy.visit("https://www.zoho.com/commerce/free-demo.html")
    cy.get('#zcf_address_country')
      .select("Italy")
      .should('have.value', 'Italy')
  })

  it("dropdown without select", () => {
    cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/")
    cy.get("#select2-billing_country-container").click()
    cy.get(".select2-search__field").type("Italy{enter}")

    cy.get("#select2-billing_country-container").should('have.text', 'Italy')
  })

  it("auto suggested dropdown to selection", () => {
    cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/")
    cy.get("#select2-billing_country-container").click()
    cy.get(".select2-search__field").type('Bri')
    cy.get("li.select2-results__option").contains('Virgin Islands (British)').click()

    cy.get("#select2-billing_country-container").should('have.text', "Virgin Islands (British)")
  })

  it("auto suggested dropdown to new page", () => {
    cy.visit("https://www.wikipedia.org")
    cy.get('body').then($body => {
      if ($body.find("button.frb-header-minimize").length > 0) {  // Fund raiser button may not be there
        cy.get("button.frb-header-minimize").click()
      }
    })
    cy.get("#searchInput").type('Delhi')
    cy.get(".suggestion-title").contains('Delhi University').click()
  })

  it("Dynamic dropdown", () => {
    cy.visit("https://www.google.com")
    cy.get("textarea[name='q']").type("Cypress automation")
    cy.get("li[data-attrid='AutocompletePrediction'] div:not([style])[role='presentation'] span").filter(':visible').should('have.length', 10)
    cy.get("li[data-attrid='AutocompletePrediction'] div:not([style])[role='presentation'] span").filter(':visible').each(($el, index, $list) => {
      if($el.text() === 'cypress automation tool') {
        cy.wrap($el).click()
      }
    })
    cy.get("textarea[name='q']").should('have.value', 'cypress automation tool')
  })
})