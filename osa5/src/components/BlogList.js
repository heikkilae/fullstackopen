import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateBlog }) => (
  <div>
    {blogs.map(blog => <Blog key={blog._id} blog={blog} updateBlog={updateBlog} />
    )}
  </div>
)

export default BlogList