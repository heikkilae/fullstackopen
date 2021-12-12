import React from 'react'
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import { Container, VStack, Heading } from '@chakra-ui/react'

import Navigation from './components/app/Navigation'
import LoginForm from './components/app/LoginForm'

import Users from './Users'
import Blogs from './Blogs'

const App = () => {
  const user = useSelector(state => state.user)

  const containerStyle = {
    maxW: 'container.lg.xl',
    p: '0'
  }

  const contentBoxStyle = {
    w: '100%',
    p: 5,
    spacing: 5,
    alignItems: 'flex-start'
  }

  const basicPageBoxStyle = {
    align: 'from-start',
    bg: 'white',
    borderWidth: '1px',
    shadow: 'md',
    w: 'full',
    p: 3
  }

  return (
    <Container {...containerStyle} >
      <Router>
        <div>
          <Navigation />
          {user === null ?
            <LoginForm /> :
            <VStack {...contentBoxStyle}>
              <Heading as='h2' size='xl'>blog app</Heading>
              <Switch>
                <Route path="/users/:id">
                  <Users basicPageBoxStyle={basicPageBoxStyle} />
                </Route>
                <Route path="/users">
                  <Users basicPageBoxStyle={basicPageBoxStyle} />
                </Route>
                <Route path="/blogs/:id">
                  <Blogs basicPageBoxStyle={basicPageBoxStyle} />
                </Route>
                <Route path="/">
                  <Blogs basicPageBoxStyle={basicPageBoxStyle} />
                </Route>
              </Switch>
            </VStack>}
        </div>
      </Router>
    </Container>
  )
}

export default App