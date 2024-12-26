import { logins } from '../fixtures/orangehrm2.json'

describe("Fixtures - Direct access", () => {
  // Direct access
  it('Fixtures - Direct access', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com')

    cy.fixture('orangehrm.json').then((data) => {
      cy.get("input[placeholder='Username']").type(data.username)
      cy.get("input[placeholder='Password']").type(data.password)
      cy.get('button[type="submit"]').click()
      
      cy.get('h6.oxd-text--h6').should('have.text', data.expected)
    })

  })
})

describe("Fixtures - Hooks", () => {
  let userdata
  before(() => {
    cy.fixture('orangehrm').then((data) => {
      userdata = data;
    })
  })

  // Access through Hook - for multiple it blocks
  it('Fixtures - Hooks', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com')

    cy.get("input[placeholder='Username']").type(userdata.username)
    cy.get("input[placeholder='Password']").type(userdata.password)
    cy.get('button[type="submit"]').click()
    
    cy.get('h6.oxd-text--h6').should('have.text', userdata.expected)
  })
})

describe.only("Fixture - Data Driven Test", () => {
  // Creates a test for each set of fixture data
  logins.forEach((userdata) => {
    it('Fixture - ' + userdata.title, () => {
        cy.visit('https://opensource-demo.orangehrmlive.com')

        cy.get("input[placeholder='Username']").type(userdata.username)
        cy.get("input[placeholder='Password']").type(userdata.password)
        cy.get('button[type="submit"]').click()


        if (userdata.expected == 'Invalid credentials') {
        // Invalid credentials
          cy.get('p.oxd-alert-content-text').should('have.text', userdata.expected)
        } else {
          // Valid credentials
          cy.get('h6.oxd-text--h6').should('have.text', userdata.expected)
          
          // Logout
          cy.get('.oxd-userdropdown-name').click()
          cy.get('.oxd-dropdown-menu > li').contains('Logout').click()
          cy.get('.orangehrm-login-title').should('have.text', 'Login')
        }
    })
  })
})