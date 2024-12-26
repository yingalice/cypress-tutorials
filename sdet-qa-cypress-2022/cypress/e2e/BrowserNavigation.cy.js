// navigate between multiple pages
// go()
describe('Browser Navigation', () => {
  it('Navigation', () => {
    cy.visit('https://demo.opencart.com/')
    cy.title().should('eq', 'Your Store')

    const category = 'Cameras'
    const regex = new RegExp('^' + category + '$')
    cy.contains('.nav-link', regex).click()
    cy.title().should('eq', category)
    cy.get('div#content > h2').should('have.text', category)

    cy.go('back')  // Back to home
    cy.title().should('eq', 'Your Store')

    cy.go('forward')  // Forward to cameras
    cy.title().should('eq', category)

    cy.go(-1)  // Back to home
    cy.title().should('eq', 'Your Store')

    cy.go(1)  // Forward to cameras
    cy.title().should('eq', category)

    cy.reload()
  })
})