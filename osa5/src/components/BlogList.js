import React from 'react'
import Blog from './Blog'

const BlogList = ({username, blogs}) => (
  <div>
    <h2>blogs</h2>
    <p>{username} logged in</p>
    {blogs.map(blog =>
      <Blog key={blog._id} blog={blog} />
    )}
  </div>
)

export default BlogList