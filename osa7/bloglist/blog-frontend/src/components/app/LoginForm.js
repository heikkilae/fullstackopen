import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { VStack, FormLabel, FormControl, Input, Heading, Button } from '@chakra-ui/react'

import loginService from '../../services/login'
import blogService from '../../services/blogs'
import { setUser } from '../../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')

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

    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  return (
    <VStack borderRadius='xl' p='20' spacing={3}>
      <Heading as='h3' size='lg'>log in to application</Heading>
      <form onSubmit={handleLogin}>
        <VStack alignItems='flex-start' p={3}>
          <FormControl>
            <FormLabel>username:</FormLabel>
            <Input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={handleUsername}
            />
          </FormControl>
          <FormControl>
            <FormLabel>password:</FormLabel>
            <Input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={handlePassword}
            />
          </FormControl>
          <Button id="login-button" type="submit">login</Button>
        </VStack>
      </form>
    </VStack>
  )
}

export default LoginForm