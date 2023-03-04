beforeEach(() => {
  // Login
  cy.visit('/');
  cy.get('h1').should('be.visible'); // Waits for page to load
  cy.get('[id="email-input"]').type('jhieronymus@nevada.unr.edu');
  cy.get('[id="password-input"]').type('1234');
  cy.get('[id="login-button"]').click();
});

describe('Book search functions as expected', () => {
  it('Happy Path', () => {
    // Search for book
    cy.url().should('include', '/home');
    cy.get('h1').should('be.visible'); // Waits for page to load
    cy.get('[id="book-search-input"]').type('Hooray for Snail!');
    cy.get('[id="book-search-button"]').click();

    // Check results
    cy.url().should('include', '/search-results');
    cy.get('h1').should('be.visible'); // Waits for page to load
    cy.get('h2').contains('Hooray for Snail!').should('be.visible'); // Result shows
  });

  it('Unhappy Path - Run with Google Books API Off', () => {
    // Searchbar should be disabled
    cy.url().should('include', '/home');
    cy.get('h1').should('be.visible'); // Waits for page to load
    cy.get('[id="book-search-input"]').should('be.disabled');
    cy.get('[id="book-search-button"]').should('be.disabled');
    cy.get('span')
      .contains('Sorry, we are unable to search for books at this time.')
      .should('be.visible');
  });
});
