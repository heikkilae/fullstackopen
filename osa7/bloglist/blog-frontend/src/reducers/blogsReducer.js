import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'UPDATE_BLOG': {
    const updatedBlog = action.data
    return state.map(o => o._id === updatedBlog._id ? updatedBlog : o)
  }
  case 'ADD_BLOG':
    if (action.data) {
      return state.concat(action.data)
    }
    return state
  case 'REMOVE_BLOG':
    return state.filter(o => o._id !== action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (newBlog) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create(newBlog)
      dispatch({
        type: 'ADD_BLOG',
        data: createdBlog,
      })
    } catch (exception) {
      console.log('cannot create blog:', exception)
    }
  }
}

export const updateBlog = newBlog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(newBlog._id, newBlog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog,
      })
    } catch (exception) {
      console.log('cannot update blog:', exception)
    }
  }
}

export const removeBlog = id => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id,
      })
    } catch (exception) {
      console.log('cannot remove blog:', exception)
    }
  }
}

export default reducer