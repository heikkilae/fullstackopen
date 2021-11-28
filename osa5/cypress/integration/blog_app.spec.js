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
    cy.visit('http://localhost:3000')

    // Bypass original login
    cy.bypassLogin({ username: 'tTestaaja', password: 'salainen' })
  })

  it('A blog can be created', function() {
    cy.contains('create new blog').click()
    cy.get('#title').type('The very first blog post')
    cy.get('#author').type('Teppo Testaaja')
    cy.get('#url').type('http://localhost')
    cy.get('#create-button').click()
    cy.contains('The very first blog post')
  })

  describe('blog exists', function () {
    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('The very first blog post').should('not.exist')
    })
  })

  describe('Multiple blogs', function () {
    it('Blogs can be sorted by likes', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('The very first blog post')
      cy.get('#author').type('Teppo Testaaja')
      cy.get('#url').type('http://localhost')
      cy.get('#create-button').click().wait(500)

      cy.contains('create new blog').click()
      cy.get('#title').type('The second blog post')
      cy.get('#author').type('Teppo Testaaja')
      cy.get('#url').type('http://localhost')
      cy.get('#create-button').click().wait(500)
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('like').click()

      // Check the top most element is most liked with two like clicks
      cy.get('#blog-item').contains('The second blog post')
    })
  })
})