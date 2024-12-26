describe("Assertions demo", () => {
  it("Implicit assertions", () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    // cy.url().should('include', 'orangehrmlive.com')  // 'include' and 'contain' are aliases
    // cy.url().should('contain', 'orangehrm')          // 'include' and 'contain' are aliases
    // cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
    // cy.url().should('include', 'orangehrmlive.com')
    //         .should('contain', 'orangehrm')
    //         .should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.url().should('include', 'orangehrmlive.com')
      .and('contain', 'orangehrm')
      .and('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      .and('not.contain', 'greenhrm')

    cy.title().should('include', 'Orange')
      .and('eq', 'OrangeHRM')
      .and('contain', 'HRM')

    cy.get('.orangehrm-login-branding > img').should('be.visible')  // Logo visible
      .and('exist')                                                 // Logo exist

    cy.xpath('//a').should('have.length', '5');  // No of links
    cy.get("input[placeholder='Username']").type("Admin")  // Type into input box
    cy.get("input[placeholder='Username']").should('have.value', 'Admin')
  })

  it("Explicit assertions", () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[placeholder='Username']").type("Admin")
    cy.get("input[placeholder='Password']").type("admin123")
    cy.get("button[type='submit']").click()

    let expectedName = "Jose Silva"  // dynamic name
    cy.get(".oxd-userdropdown-name").then((x) => {
      let actualName = x.text()

      // BDD style
      expect(actualName).to.equal(expectedName)
      // expect(actualName).to.not.equal(expectedName)

      //TDD style
      // (don't see this on official website anymore)
      assert.equal(actualName, expectedName)
      // assert.notEqual(actualName, expectedName)
    })
  })
})