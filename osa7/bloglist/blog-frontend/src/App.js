import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'

import Login from './components/Login'

import Users from './Users'
import Blogs from './Blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  // Effect hook to check if user already logged in
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    // Another way: window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  return (
    <Router>
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
            <Switch>
              <Route path="/users/:id">
                <Users />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Blogs />
              </Route>
            </Switch>
          </div>}
      </div>
    </Router>
  )
}

export default App