import React from 'react'
import Blog from './Blog'

const BlogList = ({username, blogs, handleLogout}) => (
    <div>
      <h2>blogs</h2>
      <p>{username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs.map(blog => <Blog key={blog._id} blog={blog} />
      )}
    </div>
)

export default BlogList