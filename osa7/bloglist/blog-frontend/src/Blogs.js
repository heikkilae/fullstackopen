import React, { useRef, useEffect } from 'react'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs, addBlog, updateBlog, removeBlog } from './reducers/blogsReducer'

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