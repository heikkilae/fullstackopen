import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // Effect hook to request blogs when render App
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // Effect hook to check if user already logged in
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      // Store user into local store (try window.localStorage command in console)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    // Another way: window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      console.log('cannot create blog:', exception)
    }
  }

  return (
    <div>
      {user === null ? 
      <Login 
        username={username}
        password={password}
        handleUsername={handleUsername}
        handlePassword={handlePassword}
        handleLogin={handleLogin}
      /> : 
      <div>
        <BlogForm 
          newTitle={newTitle} 
          newAuthor={newAuthor}
          newUrl={newUrl}
          handleNewTitle={handleNewTitle}
          handleNewAuthor={handleNewAuthor}
          handleNewUrl={handleNewUrl}
          handleSubmit={handleSubmit}
        />
        <BlogList username={user.username} blogs={blogs} handleLogout={handleLogout} />
      </div>}
    </div>
  )
}

export default App