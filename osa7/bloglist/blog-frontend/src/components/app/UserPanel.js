import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setUser } from '../../reducers/userReducer'
import blogService from '../../services/blogs'

const UserPanel = ({ style }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  // Effect hook to check if user already logged in
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.clear()
    // Another way: window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  if (!user) return null

  return (
    <div style={style}>
      {user.username} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserPanel