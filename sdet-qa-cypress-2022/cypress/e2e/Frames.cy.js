describe("Handling frames", () => {
  it("Approach 1 - Hard code", () => {
    cy.visit("https://the-internet.herokuapp.com/iframe")

    // Get iframe body
    const iframe = cy.get("iframe#mce_0_ifr")
                    .its('0.contentDocument.body')
                    .should('not.be.undefined')
                    .wait(20)

    // Fields are currently read-only because the website exceeded its monthly quota
    
    // Make editable
    iframe.invoke('attr', 'contenteditable', 'true')
          .should('have.attr', 'contenteditable', 'true')
    
    // Type text after clearing
    iframe.clear().type("Welcome{selectAll}")
          .should('have.text', 'Welcome')

    // Make enabled
    cy.get("button[title='Bold']")
      .invoke('removeAttr', 'aria-disabled')
      .should('not.have.attr', 'aria-disabled')

    // Click bold
    cy.get("button[title='Bold']").click()
  })



  it("Approach 2 - Use custom command", () => {
    cy.visit("https://the-internet.herokuapp.com/iframe")

    // Get iframe body
    const iframe = cy.getIframe("iframe#mce_0_ifr")

    // Fields are currently read-only because the website exceeded its monthly quota
    
    // Make editable
    iframe.invoke('attr', 'contenteditable', 'true')
          .should('have.attr', 'contenteditable', 'true')
    
    // Type text after clearing
    iframe.clear().type("Welcome{selectAll}")
          .should('have.text', 'Welcome')

    // Make enabled
    cy.get("button[title='Bold']")
      .invoke('removeAttr', 'aria-disabled')
      .should('not.have.attr', 'aria-disabled')

    // Click bold
    cy.get("button[title='Bold']").click()
  })



  it("Approach 3 - Use cypress iframe plugin", () => {
    // Run: npm install -D cypress-iframe
    // frameLoaded - Check iframe is loaded
    // iframe - Subsequent commands are executed inside iframe
    // enter - Execute group of commands in iframe

    cy.visit("https://the-internet.herokuapp.com/iframe")

    // Check frame loaded
    cy.frameLoaded("iframe#mce_0_ifr")
    
    // Fields are currently read-only because the website exceeded its monthly quota
    
    // Make editable
    cy.iframe("iframe#mce_0_ifr").invoke('attr', 'contenteditable', 'true')
      .should('have.attr', 'contenteditable', 'true')
          
    // Type text after clearing
    cy.iframe("iframe#mce_0_ifr").clear().type("Welcome{selectAll}")
      .should('have.text', 'Welcome')

    // Make enabled
    cy.get("button[title='Bold']")
      .invoke('removeAttr', 'aria-disabled')
      .should('not.have.attr', 'aria-disabled')

    // Click bold
    cy.get("button[title='Bold']").click()
  })
})