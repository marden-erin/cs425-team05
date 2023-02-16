describe('Home page loads', () => {
  it('Page loads', () => {
    cy.visit('/');
    cy.get('h1').should('be.visible');
  });
});
