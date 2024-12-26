describe('Hooks & Tags', () => {

  before(() => {
    cy.log('*** Launch app ***')
  })

  after(() => {
    cy.log('*** Close app ***')
  })

  beforeEach(() => {
    cy.log('*** Login ***')
  })

  afterEach(() => {
    cy.log('*** Logout ***')
  })

  it('search', () => {
    cy.log("*** 1.  Search ***")
  })

  it('advanced search', () => {
    cy.log('*** 2.  Advanced search ***')
  })

  it('list products', () => {
    cy.log('*** 3.  List products ***')
  })
})