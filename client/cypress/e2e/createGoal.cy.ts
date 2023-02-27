describe('Create Goal page loads', () => {
  it('Page loads', () => {
    cy.visit('/create-goal');
    cy.injectAxe(); // Command that injects accessibility testing to page
    cy.get('h1').should('be.visible');
    cy.checkA11y(); // Actual accessibility checker
  });
});
