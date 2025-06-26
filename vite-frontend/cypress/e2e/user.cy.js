describe('UserList Component', () => {

  it('displays a h2 with "Second test"', () => {
    cy.visit('/'); // Adjust if UserList is on another route
    cy.get('[data-testid="page-title"]').should('have.text', 'Second test');
  });


});