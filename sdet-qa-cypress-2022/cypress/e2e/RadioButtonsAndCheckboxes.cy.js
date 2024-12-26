 describe("Check UI Elements", () => {
  it("Checking Radio Buttons", () => {
    cy.visit("https://qa-automation-practice.netlify.app/radiobuttons.html")

    // visibility of radio buttons
    cy.get('input#radio-button1').should('be.visible')
    cy.get('input#radio-button2').should('be.visible')
    cy.get('input#radio-button3').should('be.visible')
    cy.get('input#radio-button4').should('be.visible')

    // selecting radio buttons
    cy.get('input#radio-button1').check().should('be.checked')
    cy.get('input#radio-button2').should('not.be.checked')
    cy.get('input#radio-button3').should('not.be.checked')
    cy.get('input#radio-button4').should('not.be.checked')

    cy.get('input#radio-button2').check().should('be.checked')
    cy.get('input#radio-button1').should('not.be.checked')
    cy.get('input#radio-button3').should('not.be.checked')
    cy.get('input#radio-button4').should('not.be.checked')
  })

  it("Checking check boxes", () => {
    cy.visit("https://qa-automation-practice.netlify.app/checkboxes")

    // visibility of element
    cy.get("input#checkbox1").should('be.visible')
    cy.get("input#checkbox2").should('be.visible')
    cy.get("input#checkbox3").should('be.visible')

    // selecting single check box
    cy.get("input#checkbox1").check().should('be.checked')

    // unselecting checkbox
    cy.get("input#checkbox1").uncheck().should('not.be.checked')

    // ========================
    // selecting all checkboxes
    cy.get("input.form-check-input[type='checkbox']").check().should('be.checked')

    // unselecting all checkboxes
    cy.get("input.form-check-input[type='checkbox']").uncheck().should('not.be.checked')

    // ========================
    // select first and last checkboxes
    cy.get("input.form-check-input[type='checkbox']").first().check().should('be.checked')
    cy.get("input.form-check-input[type='checkbox']").last().check().should('be.checked')
  })
})