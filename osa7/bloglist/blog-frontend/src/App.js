import React from 'react'
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import Navigation from './components/app/Navigation'
import LoginForm from './components/app/LoginForm'

import Users from './Users'
import Blogs from './Blogs'

const App = () => {
  const user = useSelector(state => state.user)

  return (
    <Router>
      <div>
        <Navigation />
        {user === null ?
          <LoginForm /> :
          <div>
            <h2>blog app</h2>
            <Switch>
              <Route path="/users/:id">
                <Users />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/blogs/:id">
                <Blogs />
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