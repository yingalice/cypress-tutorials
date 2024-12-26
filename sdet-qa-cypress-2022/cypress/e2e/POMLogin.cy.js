import Login from '../PageObjects/LoginPage'

describe('POM', () => {
  it('Login - General approach', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get("input[placeholder='Username']").type("Admin")
    cy.get("input[placeholder='Password']").type("admin123")
    cy.get("button[type='submit']").click()
    cy.get('h6.oxd-text--h6').should('have.text', 'Dashboard')
  })

  it('Login - POM', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    const loginPage = new Login()

    loginPage.setUserName('Admin')
    loginPage.setPassword('admin123')
    loginPage.clickSubmit()
    loginPage.verifyLogin()
  })

  it.only('Login - POM with fixtures', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    const loginPage = new Login()

    cy.fixture('orangehrm').then((data) => {
      loginPage.setUserName(data.username)
      loginPage.setPassword(data.password)
      loginPage.clickSubmit()
      loginPage.verifyLogin()
    })
  })
})