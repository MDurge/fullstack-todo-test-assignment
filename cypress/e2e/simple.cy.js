describe('Simple Test', () => {
  it('should load the login page', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Login').should('be.visible')
  })
})
