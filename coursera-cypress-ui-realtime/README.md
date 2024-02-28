=== Course ===
- [Learn Cypress UI test automation with real-time scenarios](https://www.coursera.org/projects/learn-cypress-ui-test-automation-with-real-time-scenarios) from Coursera Project Network (instructor: Saurabh Dhingra)

=== Learning Objectives ===
- Understanding Cypress and its architecture
- Integration with form elements
- Adding assertions to the test cases
- Handling multiple elements
- Scroll down operation
- IFrame handling
- Drag and drop operation
- Multiple tab handling
- Fixtures in Cypress

=== Notes ===
- [Configuration](https://docs.cypress.io/guides/references/configuration) file: `cypress.config.js`
  - Exclude folders that start with 1- and 2- 
	  - `excludeSpecPattern: ["**/1-*/**", "**/2-*/**"]`
- Default suffix for test files
  - `.cy.js` in cypress/e2e/** folder
- `.get()` uses CSS selector
  - For first child, can use `cy.get("#id > p")` or `cy.get("#id").first("p")` (for readability)
  - Recommend `.contains()` over `.get()` to identify element, because you can use both selector and text
    - `cy.contains("button", "Submit").click();`
- Interactions:
  - `.click()` vs `.check()`
    - `.click()` clicks element, regardless of previous state
    - `.check()` ensures checkbox is checked
  - `.select()` by value or text
  - If an element is covered by another element, you can use the *force* option
    - `cy.get("#searchDropdownBox").select("Electronics", {force: true});`
- Use Chai [assertions](https://docs.cypress.io/guides/references/assertions)
  - Commonly used by appending `.should()` to `cy.get()` or `cy.contains`
    - `cy.get("#confirmation > p").should("contain", "successfully filled in form!");`
    - `cy.get("@button").should("have.attr", "href", "https://qatechhub.com")`
- Alias (variable):
  - `.as("products")` creates global variable
  - `.get("@products")` retrieves variable
  - `.invoke('text')` used to call a function on a previously yielded subject.  In this case, retrieve text
    ```
    cy.get("[data-component-type='s-search-result']").as("products");
    cy.get("@products").eq(5).invoke('text').then(productText => {
      cy.log(productText);
    });
    ```
- `.each()` loop to iterate over multiple elements
  ```
  cy.get('@products').each(($el, index, $list) => {
    cy.wrap($el).scrollIntoView();  // Cypress command
    cy.log("Index : " + index + " and the product is " + $el.text());  // jQuery command
  })
  ```
  - `.wrap()` converts Jquery objects (`$el`) to Cypress objects, so we can use Cypress commands on it
- iFrame - Embed a HTML page into another
  - Use `contents()` to get iframe's content document, and `.find()` to get its descendants
  - ```
    cy.get(".demo-frame").then($frame => {
      cy.wrap($frame.contents()).find("#draggable")
    })
    ```
- Drag and drop
  - Use `trigger()` to trigger an event on an element
    ```
    cy.get('[data-cy=draggable]')
    .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
    .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
    .trigger('mouseup')
    ```
- Multiple tabs (not supported by Cypress)
  - Remove `target="_blank"` attribute so it will open in the same tab
    - `cy.get("@button").invoke("removeAttr", "target").click();`
- Fixtures
  - Read data from external files, used in data-driven-testing
  - Define data under cypress/fixtures with .json format
    ```
    {
      "firstName": "Alice",
      "lastName": "Ying",
    }
    ```
  - Reference the fixture file (.json not needed), and store its data in global this
    ```
    cy.fixture("form_elements").then(data => {
      globalThis.data = data;
    });
    ```
  - Get the data's value
    - ` cy.get(".wpforms-field-name-last").type(data.lastName);`