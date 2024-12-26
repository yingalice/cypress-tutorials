// click on link using label
// overwriting existing contains() command
// reusable custom command

describe('Custom Commands', () => {
  it('Handling links', () => {
    const label = 'Web Tables'
    cy.visit('https://demoqa.com/elements')

    // Approach 1: Without custom command (direct)
    // const regex = new RegExp('^' + label + '$')
    // cy.contains("span.text", regex).click()

    // Approach 2: With custom command
    cy.clickLink(label)

    cy.get('h1.text-center').should('have.text', label)
  })

  it('overwriting existing command', () => {
    const label = 'WEB TABLES'

    cy.visit('https://demoqa.com/elements')
    cy.clickLink(label)

    const regex = new RegExp('^' + label + '$', 'i')  // Case insensitive
    cy.get('h1.text-center').invoke('text').should('match', regex)
  })

  it.only('Login command', () => {
    cy.visit('https://practicetestautomation.com/practice/')
    cy.clickLink('Test Login Page')  // Custom click
    cy.title().should('eq', 'Test Login | Practice Test Automation')

    cy.loginApp('student', 'Password123')  // Custom login
    cy.get('h1.post-title').should('have.text', 'Logged In Successfully')
  })
})