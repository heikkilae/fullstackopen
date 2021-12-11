import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { initializeBlogs, addBlog, updateBlog, removeBlog } from './reducers/blogsReducer'

import Togglable from './components/Togglable'
import BlogForm from './components/blogs/BlogForm'
import BlogList from './components/blogs/BlogList'
import Blog from './components/blogs/Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  // Effect hook to request blogs when render App
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const createBlog = (newBlog) => {
    dispatch(addBlog(newBlog))
    blogFormRef.current.toggleVisibility()
  }

  const blogLiked = async id => {
    const blog = blogs.find(b => b._id === id)
    const newBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(newBlog))
  }

  const id = useParams().id

  if (id) {
    const blog = blogs.find(blog => blog._id === id)
    return (
      <Blog
        blog={blog}
        likeClicked={blogLiked}
        remove={(id) => {
          dispatch(removeBlog(id))
        }}
        expanded={true}
      />
    )
  }

  // Sort blogs to show most liked on top
  blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)

  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm handleSubmit={createBlog} />
      </Togglable>
      <BlogList blogs={blogs} onBlogLiked={blogLiked} onRemoveBlog={(id) => dispatch(removeBlog(id))} />
    </div>
  )
}

export default Blogs