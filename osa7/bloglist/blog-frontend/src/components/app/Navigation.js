import React from 'react'
import { Link } from 'react-router-dom'

import UserPanel from './UserPanel'

import { HStack, Button, Spacer } from '@chakra-ui/react'

const Navigation = () => {
  const navigationStyle = {
    px: '5',
    py:'2',
    shadow: 'md',
    spacing: '5'
  }

  const buttonStyle = {
    variant: 'link'
  }

  return (
    <HStack {...navigationStyle}>
      <Button {...buttonStyle} as={Link} to="/">blogs</Button>
      <Button {...buttonStyle} as={Link} to="/users">users</Button>
      <Spacer />
      <UserPanel />
    </HStack>
  )
}

export default Navigation
