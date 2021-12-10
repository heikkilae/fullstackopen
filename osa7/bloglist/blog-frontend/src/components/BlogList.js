import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, onBlogLiked, onRemoveBlog }) => (
  <div>
    {blogs.map(blog => <Blog key={blog._id} blog={blog} likeClicked={onBlogLiked} remove={onRemoveBlog} />
    )}
  </div>
)

export default BlogList