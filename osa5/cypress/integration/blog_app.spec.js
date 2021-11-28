describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teppo Testaaja',
      username: 'tTestaaja',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('login succeeds with correct credentials', function() {
      cy.get('#username').type('tTestaaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      
      cy.contains('tTestaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('vaaraMies')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('log in to application')
    })
  })
})