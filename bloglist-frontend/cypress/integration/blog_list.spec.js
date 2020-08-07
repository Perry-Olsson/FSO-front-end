describe('blog list app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('userTest | testing the user linked blogs')
  })
})