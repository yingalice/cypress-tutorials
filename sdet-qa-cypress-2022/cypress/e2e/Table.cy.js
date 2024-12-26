describe('Handle Tables', { defaultCommandTimeout: 30000 }, () => {
  beforeEach('Login', () => {
    // Login
    cy.visit("https://demo.opencart.com/admin/index.php")
    cy.get("#input-username").clear().type("demo")
    cy.get("#input-password").clear().type("demo")
    cy.get("#form-login").submit()

    // Go to Customers --> Customers
    cy.get("#menu-customer > a").contains("Customers").click()  // customers main meu
    cy.get("#menu-customer > ul").contains("Customers").click()  // customers sub menu
  })

  it("Check number of rows & columns", () => {
    cy.get("table > tbody > tr").should('have.length', 10)  // # Rows
    cy.get("table > thead > tr > td")
      .should('have.length', 6)  // # Columns
      .each(($td, i, $list) => {
        const headers = ['', 'Customer Name', 'E-Mail', 'Customer Group', 'Date Added', 'Action']
        expect($td).to.have.text(headers[i])  // Column names
    })
  })

  it("Check cell data from specific row & column", () => {
    function getTableData(row, col) {
      return cy.get(`table > tbody > tr:nth-child(${row}) > td:nth-child(${col})`)
    }
    
    getTableData(1, 5).should('have.text', '11/11/2024')  // 1st row, 5th column
    getTableData(5, 3).should('have.text', 'minhkhoi@gmail.com')// 5th row, 3rd column
  })

  it("Read all row & column data in the first page", () => {
    cy.get(`table > tbody > tr`)
      .each(($row, rowIndex, $rows) => {
        cy.wrap($row).within(() => {
          cy.get("td").each(($col, colIndex, $cols) => {
            cy.log(rowIndex + "," + colIndex + ":" + $col.text())
          })
        })
      })
  })

  it.only("Pagination", () => {
    // Find total number of pages
    let totalPages
    cy.get(".row > div.text-end").then(($e) => {
      const myText = $e.text()  // Showing 1 to 10 of 11047 (1105 Pages)

      // IndexOf approach:
      totalPages = myText.substring(myText.indexOf("(") + 1, myText.indexOf("Pages") - 1);
      cy.log(`indexOf approach: Total number of pages in a table: ${totalPages}`)

      // Regex approach:
      const regex = /\((.*) Pages\)/
      totalPages = myText.match(regex)[1]
      cy.log(`regex approach: Total number of pages in a table: ${totalPages}`)
    })

    // For simplicity, just click through 5 pages, all of them is too much
    totalPages = 5
    let emails = []

    for(let p = 1; p <= totalPages; p++) {
      if(totalPages > 1) {
        if (p > 1) {
          // Go to next page, and confirm it's the new active page
          const regex = new RegExp("^" + p + "$")
          cy.get("ul.pagination a.page-link").contains(regex).click()
          cy.get("ul.pagination span.page-link").should('have.text', p)
          cy.wait(100, {log: false})  // Wait to avoid 429 response -- too many rate request errors
        }
      }
      cy.log("==========Active page is " + p + "==========")

      // Save emails from every row of each page
      cy.contains("table > thead > tr > td", /^E-Mail$/).invoke('index').then((emailIndex) => {  // Get index of the column with the Email header
        cy.get(`table > tbody > tr`).each(($row, index, $rows) => {
          cy.wrap($row).within(() => {
            cy.get(`td:nth-child(${emailIndex + 1})`).then(($email) => {
              emails.push($email.text())
            })
          })
        })
      })
    }
    cy.log(emails)
  })
})