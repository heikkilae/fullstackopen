import React, { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    // Another way: window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log('cannot create blog:', exception)
    }
  }

  const updateBlog = async blog => {
    try {
      const updatedBlog = await blogService.update(blog._id, blog)
      const newBlogs = blogs.map(o => o._id === updatedBlog._id ? updatedBlog : o)
      setBlogs(newBlogs)
    } catch (exception) {
      console.log('cannot update blog:', exception)
    }
  }

  const removeBlog = async id => {
    try {
      await blogService.remove(id)
      const newBlogs = blogs.filter(o => o._id !== id)
      setBlogs(newBlogs)
    } catch (exception) {
      console.log('cannot remove blog:', exception)
    }
  }

  blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)

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
          <h2>blogs</h2>
          <p>{user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm handleSubmit={createBlog} />
          </Togglable>
          <BlogList blogs={blogs} updateBlog={updateBlog} removeBlog={removeBlog} />
        </div>}
    </div>
  )
}

export default App