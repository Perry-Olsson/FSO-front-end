import loginHelper from '../../src/utils/loginHelper'

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem('loggedUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('addTestBlog', () => {
  const token = loginHelper.getLoggedUser()
  const testBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test url'
  }
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: testBlog,
    headers: {
      'Authorization': token
    }
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addTestBlogs', () => {
  const token = loginHelper.getLoggedUser()
  const initialBlogs = [
    { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
    { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5 },
    { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12 },
    { title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10 },
    { title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0 },
    { title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2 }
  ]

  for (let blog of initialBlogs) {
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: blog,
      headers: {
        'Authorization': token
      }
    })
  }
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3001/api/users', { username, name, password })
})