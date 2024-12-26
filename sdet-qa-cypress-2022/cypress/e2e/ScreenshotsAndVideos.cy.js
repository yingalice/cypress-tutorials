describe('Screenshots and Videos', {defaultCommandTimeout: 10000}, () => {
  it('Explicit capture - Capture screenshots & videos', () => {
    cy.visit('https://demo.opencart.com')
    cy.reload()
    cy.get('#logo img', {timeout:20000}).should('be.visible')
    cy.screenshot('homepage', {overwrite: true})
    cy.get('#logo img').screenshot('opencart-banner', {overwrite: true})
  })

  it('Automatically capture video and screenshot on failure - Only when ran thru CLI', () => {
    cy.visit('https://demo.opencart.com')
    cy.contains('a.nav-link', /^Cameras$/).click()

    // cy.get('#content > h2').should('have.text', 'Cameras')  // Pass
    cy.get('#content > h2').should('have.text', 'Tablets')  // Fail
  })
})