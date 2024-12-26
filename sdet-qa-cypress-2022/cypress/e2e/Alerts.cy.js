describe('Alerts', () => {
  // 1) Javascript Alert: It will have some text and an 'OK' button
  it('Js alert', () => {
    cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
    cy.get("button[onclick='jsAlert()']").click()

    cy.on('window:alert', (t) => {
      expect(t).to.equal("I am a JS Alert")
    })

    // alert window automatically closed by cypress
    cy.get("#result").should("have.text", "You successfully clicked an alert")
  })



  // 2) Javascript Confirm Alert: It will have some text with 'OK' and 'Cancel' buttons
  // Confirm window automatically closed by cypress using 'OK'
  // If you want to use 'Cancel', need event to return false

  it('Js confirm alert - Ok', () => {
    cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
    cy.get("button[onclick='jsConfirm()']").click()

    cy.on('window:confirm', (t) => {
      expect(t).to.equal("I am a JS Confirm")
    })

    // cypress automatically closed alert window using 'OK' button (default)
    cy.get("#result").should("have.text", "You clicked: Ok")
  })

  it('Js confirm alert - Cancel', () => {
    cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
    cy.get("button[onclick='jsConfirm()']").click()

    // cypress closed alert window using 'Cancel' button (return false)
    cy.on('window:confirm', (t) => {
      expect(t).to.equal("I am a JS Confirm")
      return false
    })

    cy.get("#result").should("have.text", "You clicked: Cancel")
  })



  // 3) Javascript Prompt Alert: It will have some text with a text box for user input along with 'OK'
  it('Js prompt alert', () => {
    cy.visit('http://the-internet.herokuapp.com/javascript_alerts')

    // Before opening alert window, get control on it, to pass the alert text
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Welcome!')
    })
    cy.get("button[onclick='jsPrompt()']").click()

    // cypress will automatically close prompted alert using 'OK' button
    cy.get("#result").should("have.text", "You entered: Welcome!")
  })


  
  // 4) Authenticated Alert
  it('Authenticated alert - Approach 1', () => {
    cy.visit('https://the-internet.herokuapp.com/basic_auth', { auth: {username: Cypress.env("username"), password: Cypress.env("password")}})
    cy.get('.example > p').should('contain', "Congratulations!")
  })

  it('Authenticated alert - Approach 2', () => {
    cy.visit(`https://${Cypress.env("username")}:${Cypress.env("password")}@the-internet.herokuapp.com/basic_auth`)

    cy.get('.example > p').should('contain', "Congratulations!")
  })
})