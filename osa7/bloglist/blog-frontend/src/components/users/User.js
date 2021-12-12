import React from 'react'
import {
  VStack,
  Heading,
  List,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'

const User = ({ user, style }) => {
  if (!user) {
    return null
  }

  return (
    <VStack {...style}>
      <Heading as='h3' size='lg'>{user.name}</Heading>
      <Heading as='h4' size='md'>added blogs</Heading>
      <List>
        <UnorderedList>
          <ListItem>
            {user.blogs.map(blog =>
              <li key={blog._id}>{blog.title}</li>
            )}
          </ListItem>
        </UnorderedList>
      </List>
    </VStack>
  )
}

export default User
