describe('Snail Adoption page loads', () => {
  it('Page loads', () => {
    cy.visit('/snail-adoption');
    cy.injectAxe(); // Command that injects accessibility testing to page
    cy.get('h1').should('be.visible');
    cy.checkA11y(); // Actual accessibility checker
  });
});
