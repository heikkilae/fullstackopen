import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
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
      // TODO: noteService.setToken(user.token)
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
      <BlogList username={user.username} blogs={blogs} handleLogout={handleLogout} />}
    </div>
  )
}

export default App