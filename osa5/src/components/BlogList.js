import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateBlog, removeBlog }) => (
  <div>
    {blogs.map(blog => <Blog key={blog._id} blog={blog} updateBlog={updateBlog} remove={removeBlog} />
    )}
  </div>
)

export default BlogList