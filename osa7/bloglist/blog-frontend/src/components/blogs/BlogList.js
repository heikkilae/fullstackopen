import React from 'react'
import Blog from './Blog'
import { List, ListItem } from '@chakra-ui/react'

const BlogList = ({ blogs, onBlogLiked, onRemoveBlog }) => (
  <List w='100%' spacing={3}>
    {blogs.map(blog =>
      <ListItem key={blog._id} bg='gray.50' borderRadius='xl' p='5'>
        <Blog blog={blog} likeClicked={onBlogLiked} remove={onRemoveBlog} />
      </ListItem>
    )}
  </List>
)

export default BlogList