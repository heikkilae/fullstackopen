import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    if (action.data) {
      return state.concat(action.data)
    }
    return state
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

export default reducer