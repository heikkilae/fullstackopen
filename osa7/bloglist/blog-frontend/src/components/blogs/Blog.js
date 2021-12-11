
import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, likeClicked, remove, expanded = false }) => {

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

  const showWhenExpandedStyle = {
    display: expanded ? '' : 'none'
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog._id}`} >{blog.title} {blog.author} </Link>
      <div style={showWhenExpandedStyle}>
        {blog.url} <br />
        likes: {likes} <button onClick={handleLikePress}>like</button> <br />
        {blog.username}
        <button onClick={handleRemovePress}>remove</button>
      </div>
    </div>
  )}

export default Blog