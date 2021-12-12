import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HStack, Text, Button } from '@chakra-ui/react'

import { setUser } from '../../reducers/userReducer'
import blogService from '../../services/blogs'

const UserPanel = () => {
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

  const handleLogout = () => {
    window.localStorage.clear()
    // Another way: window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  if (!user) return null

  return (
    <HStack>
      <Text>{user.username} logged in</Text>
      <Button
        variant='outline'
        onClick={handleLogout}>
          logout
      </Button>
    </HStack>
  )
}

export default UserPanel