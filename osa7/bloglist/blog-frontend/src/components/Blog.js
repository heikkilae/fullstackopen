
import React, { useState } from 'react'

const Blog = ({ blog, likeClicked, remove }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikePress = () => {
    likeClicked(blog._id)
  }

  const handleRemovePress = () => {
    remove(blog._id)
  }

  const buttonLabel = !visible ? 'view' : 'hide'
  const likes = blog.likes ? blog.likes : 0

  const showWhenVisibleStyle = {
    display: visible ? '' : 'none'
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
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisibleStyle}>
        {blog.url} <br />
        likes: {likes} <button onClick={handleLikePress}>like</button> <br />
        {blog.username}
        <button onClick={handleRemovePress}>remove</button>
      </div>
    </div>
  )}

export default Blog