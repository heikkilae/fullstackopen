
import React from 'react'
import { Link } from 'react-router-dom'
import { Heading, VStack, Button, Text, HStack, Box, Link as CLink } from '@chakra-ui/react'

const Blog = ({ blog, style, likeClicked, remove, expanded = false }) => {

  if (!blog) {
    return null
  }

  const handleLikePress = () => {
    likeClicked(blog._id)
  }

  const handleRemovePress = () => {
    remove(blog._id)
  }

  const likes = blog.likes ? blog.likes : 0

  if (expanded) {
    return (
      <VStack {...style}>
        <Heading as='h3' size='lg'>{blog.title}</Heading>
        <VStack alignItems='from-start'>
          <CLink href={blog.url} variant='link' isExternal>{blog.url}</CLink>
          <HStack w='xs' spacing='2'>
            <Box py='2'>
              <Text alignt='left' w='max'>likes: {likes} </Text>
            </Box>
            <Button w='full' onClick={handleLikePress}>like</Button>
          </HStack>
          <Button w='xs' onClick={handleRemovePress}>remove</Button>
          <p><em>added by {blog.author}</em></p>
        </VStack>
      </VStack>
    )
  } else {
    return (
      <VStack align ='from-start' w='full'>
        <Link to={`/blogs/${blog._id}`} >{blog.title} {blog.author} </Link>
      </VStack>
    )
  }
}

export default Blog