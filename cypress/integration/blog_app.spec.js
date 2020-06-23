describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'root',
      password: 'root',
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('#username');
    cy.get('#password');
    cy.get(`#login-button`).contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('root');
      cy.get(`#login-button`).click();
      cy.get('html').contains('logged in');
      cy.get('#logout-button').click();
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('roots');
      cy.get('#password').type('roots');
      cy.get(`#login-button`).click();
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('root');
      cy.get('#password').type('root');
      cy.get(`#login-button`).click();
    });

    it('A blog can be created', function () {
      cy.get('.create-new').click();
      cy.get('#title').type('tst cypr');
      cy.get('#author').type('tst cypr');
      cy.get('#url').type('tst cypr');
      cy.get('.submit-button').click();
      cy.get('.info').should('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('A blog can be liked', function () {
      cy.get('.create-new').click();
      cy.get('#title').type('tst cypr');
      cy.get('#author').type('tst cypr');
      cy.get('#url').type('tst cypr');
      cy.get('.submit-button').click();
      cy.get('.toggle-button').click();
      cy.get('.like-button').click();
    });
  });
});
