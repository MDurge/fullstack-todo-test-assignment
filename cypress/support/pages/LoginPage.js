const { BASE_URLS } = require('../utils/urls.js');

class LoginPage {
  // Web Element Locators
  elements = {
    usernameInput: () => cy.get('[data-cy="username"]'),
    passwordInput: () => cy.get('[data-cy="password"]'),
    loginButton: () => cy.get('[data-cy="login-button"]'),
    loginError: () => cy.get('[data-cy="login-error"]'),
    loginHeading: () => cy.contains("Login"),
    todoListHeading: () => cy.contains("Todo List")
  }

  // Essential Functions Only
  visit() {
    cy.visit(BASE_URLS.FRONTEND);
    return this;
  }

  enterCredentials(username, password) {
    this.elements.usernameInput().type(username);
    this.elements.passwordInput().type(password);
    return this;
  }

  clickLogin() {
    this.elements.loginButton().click();
    return this;
  }
}

module.exports = LoginPage;
