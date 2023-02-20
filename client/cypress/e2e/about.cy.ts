describe('About page loads', () => {
  it('Page loads', () => {
    cy.visit('/about');
    cy.injectAxe(); // Command that injects accessibility testing to page
    cy.get('h1').should('be.visible');
    cy.checkA11y(); // Actual accessibility checker
  });
});
