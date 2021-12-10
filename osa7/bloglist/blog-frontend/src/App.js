import React, { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addBlog, updateBlog, removeBlog } from './reducers/blogsReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogs = useSelector(state => state)
  const dispatch = useDispatch()

  // Effect hook to request blogs when render App
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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

  const createBlog = (newBlog) => {
    dispatch(addBlog(newBlog))
    blogFormRef.current.toggleVisibility()
  }

  const blogLiked = async id => {
    const blog = blogs.find(b => b._id === id)
    const newBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(newBlog))
  }

  const requestRemoveBlog = async id => {
    dispatch(removeBlog(id))
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
          <BlogList blogs={blogs} onBlogLiked={blogLiked} onRemoveBlog={requestRemoveBlog} />
        </div>}
    </div>
  )
}

export default App