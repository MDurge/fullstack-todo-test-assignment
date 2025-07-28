const { loginPage, todoPage } = require('../support/commands.js');
const { BASE_URLS } = require('../support/utils/urls.js');

describe('Todo App - Essential CRUD Tests', () => {
  
  it('should login with valid credentials', () => {
    // Arrange & Act
    loginPage.visit();
    loginPage.enterCredentials('user', 'pass');
    loginPage.clickLogin();
    
    // Assert
    loginPage.elements.todoListHeading().should('be.visible');
    cy.url().should('include', 'localhost:5173');
  });

  it('should login with invalid credentials', () => {
    // Arrange & Act
    loginPage.visit();
    loginPage.enterCredentials('invalid', 'wrong');
    loginPage.clickLogin();
    
    // Assert
    loginPage.elements.loginError().should('be.visible');
    loginPage.elements.loginError().should('contain.text', 'Invalid credentials');
    loginPage.elements.loginHeading().should('be.visible');
  });

  it('should create new item', () => {
    // Arrange
    cy.loginWithValidCredentials();
    const todoText = 'New Todo Item';
    
    // Act
    todoPage.addTodo(todoText);
    
    // Assert
    todoPage.elements.todoItem(todoText).should('be.visible');
    todoPage.elements.allTodoItems().should('have.length', 1);
  });

  it('should edit an existing item', () => {
    // Arrange
    cy.loginWithValidCredentials();
    todoPage.addTodo('Original Todo');
    const updatedText = 'Updated Todo';
    
    // Act
    todoPage.editTodo('Original Todo', updatedText);
    
    // Assert
    todoPage.elements.todoItem(updatedText).should('be.visible');
    todoPage.elements.todoItem('Original Todo').should('not.exist');
    todoPage.elements.allTodoItems().should('have.length', 1);
  });

  it('should delete an existing item', () => {
    // Arrange
    cy.loginWithValidCredentials();
    todoPage.addTodo('Todo to Delete');
    
    // Act
    todoPage.deleteTodo('Todo to Delete');
    
    // Assert
    todoPage.elements.todoItem('Todo to Delete').should('not.exist');
    todoPage.elements.allTodoItems().should('not.exist');
    todoPage.elements.noTodosMessage().should('be.visible');
  });
});
