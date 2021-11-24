const mongoose = require('mongoose')
// Testi importtaa tiedostoon app.js määritellyn Express-sovelluksen 
// ja käärii sen funktion supertest avulla ns. superagent-olioksi. 
// Tämä olio sijoitetaan muuttujaan api ja sen kautta testit voivat tehdä HTTP-pyyntöjä backendiin.
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "Test blog",
    author: "Test Author",
    url: "http://testurl",
    likes: 0
  },
  {
    title: "Test blog 2",
    author: "Test Author 2",
    url: "http://testurl",
    likes: 2
  },
  {
    title: "Test blog 3",
    author: "Test Author 3",
    url: "http://testurl",
    likes: 5
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('there are 3 blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

const newBlog = {
  title: 'Test blog 4',
  author: 'Test Author 4',
  url: 'http://testurl',
  likes: 0
}

test('add 1 blog', async() => {
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)

  const contents = response.body.map(r => r.title)
   expect(contents).toContain(
    'Test blog 4'
  )
})

afterAll(() => {
  mongoose.connection.close()
})