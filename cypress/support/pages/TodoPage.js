const { BASE_URLS } = require('../utils/urls.js');

class TodoPage {
  // Web Element Locators
  elements = {
    todoInput: () => cy.get('[data-cy="todo-input"]'),
    addButton: () => cy.get('[data-cy="add-todo"]'),
    todoItem: (text) => cy.get('[data-cy="todo-item"]').contains(text),
    editButton: (text) => cy.get('[data-cy="todo-item"]').contains(text).parent().find('[data-cy="edit-todo"]'),
    deleteButton: (text) => cy.get('[data-cy="todo-item"]').contains(text).parent().find('[data-cy="delete-todo"]'),
    todoItemByIndex: (index) => cy.get('[data-cy="todo-item"]').eq(index),
    allTodoItems: () => cy.get('[data-cy="todo-item"]'),
    noTodosMessage: () => cy.contains("No todos yet"),
    todoListHeading: () => cy.contains("Todo List"),
    logoutButton: () => cy.get('[data-cy="logout"]')
  }

  // Essential Functions Only
  visit() {
    cy.visit(BASE_URLS.FRONTEND);
    return this;
  }

  addTodo(todoText) {
    this.elements.todoInput().type(todoText);
    this.elements.addButton().click();
    return this;
  }

  editTodo(oldText, newText) {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(newText);
    });
    this.elements.editButton(oldText).click();
    return this;
  }

  deleteTodo(todoText) {
    this.elements.deleteButton(todoText).click();
    return this;
  }

  logout() {
    this.elements.logoutButton().click();
    return this;
  }
}

module.exports = TodoPage;
