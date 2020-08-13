describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({ username: 'cyUsername', name: 'cyName', password: 'cyPassword' })
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown by default', function() {
    cy.get('.loginForm-cy')
      .contains('username')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#loginUsername')
        .type('cyUsername')
      cy.get('#loginPassword')
        .type('cyPassword')
      cy.get('#loginButton').click()

      cy.contains('cyUsername logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#loginUsername').type('cyUsername')
      cy.get('#loginPassword').type('wrongPassword')
      cy.get('#loginButton').click()

      cy.get('html').should('not.contain', 'cyUsername logged in')
      cy.get('.failure').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cyUsername', password: 'cyPassword' })
      cy.addTestBlog()
    })

    it('A new blog can be added', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('new blog title')
      cy.get('#author').type('new blog author')
      cy.get('#url').type('new blog url')
      cy.get('#createBlog').click()

      cy.contains('new blog title | new blog author')
    })

    it('user can like a blog', function() {
      cy.get('.test-title').get('.view').click()
      cy.get('.test-title').get('.likes').click()
      cy.get('.test-title').get('.likesTest').contains('1')
    })

    it('user can delete added blogs', function() {
      cy.get('.test-title').get('.view').click()
      cy.get('.test-title').contains('Delete').click()
      cy.get('html').should('not.contain', 'test title')
    })

    it.only('User cannot delete blogs they did not add', function() {
      cy.contains('logout').click()
      cy.createUser({ username: 'deletionTestUsername', name: 'deletionTestName', password: 'deletionTestPassword' })
      cy.login({ username: 'deletionTestUsername', password: 'deletionTestPassword' })
      cy.get('.test-title').get('.view').click()
      cy.get('.test-title').get('.delete').should('not.exist')
    })
  })
})