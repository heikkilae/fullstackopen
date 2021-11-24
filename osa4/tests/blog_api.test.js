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
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

test('there are 3 blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

afterAll(() => {
  mongoose.connection.close()
})