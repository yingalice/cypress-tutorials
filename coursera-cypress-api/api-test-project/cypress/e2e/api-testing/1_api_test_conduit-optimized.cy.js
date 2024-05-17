/// <reference types="cypress" />

import {restClient} from '../../support/restClient'

describe('API Testing of Conduit App', function () {
  let token;

  // Before every test case, login and save the authorization token
  beforeEach(() => {
    // Use custom command from support/commands.js
    cy.loginToApplication('alice@fake.com', '12345');
    token = Cypress.env('token');
  });

  // Get all article tags
  it('GET Tags API', () => {
    // Use custom function from support/restClient.js
    restClient.sendGetRequest('http://localhost:3000/api/tags')
      .then((response) => {
        cy.log(JSON.stringify(response));
        expect(response.status).to.equal(200);
        expect(response.body.tags).to.contain('cypress');
      });
  });

  // Add an article by sending the authorization header, and article details
  it('Add article', () => {
    restClient.sendPostRequest('http://localhost:3000/api/articles', 
    {
      Authorization: 'Token ' + token
    },
    {
      article: {
        title: 'Cypress articles from Cypress test',
        description: 'This is regarding Cypress',
        body: 'Cypress is a test automation tool.\n\nIt is very powerful.',
        tagList: ['Cypress', 'Test'],
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('Edit Article', () => {
    let slug;

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/articles',
      headers: {
        Authorization: 'Token ' + token,
      },
      body: {
        article: {
          title: 'Cypress articles from Cypress test',
          description: 'This is regarding Cypress',
          body: 'Cypress is a test automation tool.\n\nIt is very powerful.',
          tagList: ['Cypress', 'Test'],
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      slug = response.body.article.slug;
      cy.log(slug);

      // Edit article, using the saved slug
      cy.request({
        method: 'PUT',
        url: 'http://localhost:3000/api/articles/' + slug,
        headers: {
          Authorization: 'Token ' + token,
        },
        body: {
          article: {
            title: 'Cypress articles from Cypress test - edited',
            description: 'This is regarding Cypress - edited',
            body: 'Cypress is a test automation tool.\n\nIt is very powerful.',
            tagList: ['Cypress', 'Test'],
          },
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.article.title).to.equal(
          'Cypress articles from Cypress test - edited'
        );
      });
    });
  });

  it('Delete Article', () => {
    let slug;

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/articles',
      headers: {
        Authorization: 'Token ' + token,
      },
      body: {
        article: {
          title: 'Cypress articles from Cypress test',
          description: 'This is regarding Cypress',
          body: 'Cypress is a test automation tool.\n\nIt is very powerful.',
          tagList: ['Cypress', 'Test'],
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      slug = response.body.article.slug;
      cy.log(slug);

      // Delete article
      cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/articles/' + slug,
        headers: {
          Authorization: 'Token ' + token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);

        // Confirm article is gone
        cy.request({
          method: 'GET',
          url: 'http://localhost:3000/api/articles/' + slug,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(404);
        });
      });
    });
  });
});
