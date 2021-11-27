
import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
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
        {likes} <br />
        {blog.user.name}
      </div>
    </div>
  )}

export default Blog