const testUser = {
  name: 'Teppo Testaaja',
  username: 'tTestaaja',
  password: 'salainen'
}

function login(username, password) {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('login succeeds with correct credentials', function() {
      login('tTestaaja', 'salainen')
      cy.contains('tTestaaja logged in')
    })

    it('fails with wrong credentials', function() {
      login('vaaraMies', 'salainen')
      cy.contains('log in to application')
    })
  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', testUser)
    cy.visit('http://localhost:3000')
    login('tTestaaja', 'salainen')
  })

  it('A blog can be created', function() {
    cy.contains('create new blog').click()
    cy.get('#title').type('The very first blog post')
    cy.get('#author').type('Teppo Testaaja')
    cy.get('#url').type('http://localhost')
    cy.get('#create-button').click()
    cy.contains('The very first blog post')
  })
})