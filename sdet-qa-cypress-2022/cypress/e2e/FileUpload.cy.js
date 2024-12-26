import 'cypress-file-upload';
describe("File Uploads", (() => {
  it("Single File Upload", () => {
    cy.visit("https://the-internet.herokuapp.com/upload")
    // input type="file", so can use .attachFile()
    // Files need to be in fixtures folder
    cy.get('#file-upload').attachFile('file-uploads/Adrian von Ziegler - I Need You.pdf')
    cy.get('#file-submit').click()
    cy.get("div[class='example'] h3").should('have.text', 'File Uploaded!')
  })

  it('File Upload - Rename', () => {
    cy.visit('https://the-internet.herokuapp.com/upload')
    cy.get('#file-upload').attachFile({filePath:'file-uploads/Adrian von Ziegler - I Need You.pdf', fileName:'myfile.pdf'})
    cy.get('#file-submit').click()
    cy.get("div[class='example'] h3").should('have.text', 'File Uploaded!')
  })

  it("File Upload - Drag and drop", () => {
    cy.visit("https://the-internet.herokuapp.com/upload")
    cy.get("#drag-drop-upload").attachFile('file-uploads/Adrian von Ziegler - I Need You.pdf', {subjectType: 'drag-n-drop'})
    cy.get('.dz-filename > span').should('have.text', 'Adrian von Ziegler - I Need You.pdf')
  })

  it("Multiple files upload", () => {
    cy.visit('https://davidwalsh.name/demo/multiple-file-upload.php')
    cy.get('ul#fileList > li').should('have.text', 'No Files Selected')
    cy.get('#filesToUpload').attachFile(['file-uploads/Adrian von Ziegler - I Need You.pdf', 'file-uploads/rainy.png'])
    cy.get('ul#fileList > li:nth-child(1)').should('have.text', 'Adrian von Ziegler - I Need You.pdf')
    cy.get('ul#fileList > li:nth-child(2)').should('have.text', 'rainy.png')
  })

  it.only("File Upload - Shadow Dom", () => {
    cy.visit("https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm")
    cy.get('.smart-browse-input', {includeShadowDom:true}).attachFile('file-uploads/rainy.png')
    cy.get('.smart-item-name', {includeShadowDom:true}).should('contain.text', 'rainy.png')
  })
}))