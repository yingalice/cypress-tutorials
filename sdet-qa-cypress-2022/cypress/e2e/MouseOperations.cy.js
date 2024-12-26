import '@4tw/cypress-drag-drop'

describe('Mouse Operations', () => {
  it('Mouse Over', () => {
    cy.visit('https://demo.opencart.com/')
    cy.get('.nav-link').contains('Mac').should('not.be.visible')
    cy.get('.nav').contains('Desktop').trigger('mouseover').click()
    cy.get('.nav-link').contains('Mac').should('be.visible')
  })

  it('Right click', () => {
    cy.visit('https://swisnl.github.io/jQuery-contextMenu/demo.html')
    // Approach 1: .trigger('contextmenu')
    cy.get('.context-menu-item').contains('Copy').should('not.be.visible')
    cy.get('.context-menu-one').trigger('contextmenu')
    cy.get('.context-menu-item').contains('Copy').should('be.visible')

    cy.get('body').type('{esc}')  // Cannot close menu with Cypress' simulated .click(), use Escape key
    
    // Approach 2: .rightClick()
    cy.get('.context-menu-item').contains('Copy').should('not.be.visible')
    cy.get('.context-menu-one').rightclick()
    cy.get('.context-menu-item').contains('Copy').should('be.visible')

    cy.get('body').type('{esc}')
  })

  it('Double click', () => {
    cy.visit('https://w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_ondblclick3')
    cy.frameLoaded('#iframeResult')
    
    // Approach 1: .trigger()
    cy.enter('#iframeResult').then((iframe) => {
      iframe().find('#field1').then(($input1) => {
        const field1 = $input1.val()  // Save input1's value
        expect(field1).to.eq('Hello World!')

        iframe().find('#field2').should('have.value', '')
        iframe().find('button[ondblclick="myFunction()"]').trigger('dblclick')
        iframe().find('#field2').should('have.value', field1)  // Verify field1 text is copied to field2
      })
    })

    cy.get("#runbtn").click()  // Reset this example, so we can try approach 2

    // Approach 2: .dblclick()
    cy.enter('#iframeResult').then((iframe) => {
      iframe().find('#field1').then(($input1) => {
        const field1 = $input1.val()  // Save input1's value
        expect(field1).to.eq('Hello World!')

        iframe().find('#field2').should('have.value', '')
        iframe().find('button[ondblclick="myFunction()"]').dblclick()
        iframe().find('#field2').should('have.value', field1)  // Verify field1 text is copied to field2
      })
    })
  })

  it("Drag and drop", () => {
    cy.visit("http://www.dhtmlgoodies.com/packages/dhtml-suite-for-applications/demos/demo-drag-drop-3.html")
    cy.get(".dragableBox").contains("Rome")
      .should('be.visible')
      .drag("#box106", {force: true})
    cy.get("#box106").trigger('mouseup', {force: true})  // .drag command did mousedown, dragover, mousemove, etc, 
                                                         // but not mouseup, so I added it manually
  })

  it.only("Scroll page", () => {
    const options = {   
      url: 'https://www.countries-ofthe-world.com/flags-of-the-world.html',   
      failOnStatusCode: false,
    }
    cy.visit(options)

    // Scroll down to India
    cy.get("td", {timeout: 60000}).contains("India").siblings("td").find("img").scrollIntoView({duration: 50})

    // Scroll up to Algeria
    cy.get("td").contains("Algeria").siblings("td").find("img").scrollIntoView()

    // Scroll to footer (bottom of page)
    cy.get("#footer").scrollIntoView();
  })
})