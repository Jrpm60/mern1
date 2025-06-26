describe('My First Test', () => {
  it('Visits the app and checks the title', () => {
    cy.visit('/');
    cy.title().should('eq', 'Prueba');
  });

    it('Visits the app and checks Hola exists', () => {
    cy.visit('/');
    cy.get('h1').contains('Hola');
  });

});