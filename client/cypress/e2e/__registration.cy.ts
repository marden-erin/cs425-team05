
  
  describe('Register with an email already used', () => {
    it('Unhappy Path: Registration', () => {
      cy.visit('/');
      cy.get('h1').should('be.visible');
      cy.get('[id="register-button"]').click();
      cy.url().should('include', '/register');
      cy.get('h1').should('be.visible');
      cy.get('[id="register-email"]').type('test23');
      cy.get('[id="register-username"]').type('unitTest23');
      cy.get('[id="register-password"]').type('test123');
      cy.get('[id="register-submit"]').click();
      cy.contains('Error')
    });
  });