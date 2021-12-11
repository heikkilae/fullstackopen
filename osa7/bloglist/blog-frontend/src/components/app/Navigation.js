import React from 'react'
import { Link } from 'react-router-dom'

import UserPanel from './UserPanel'

const Navigation = () => {
  const background = { background: 'lightgrey', display: 'flex' }
  const padding = { padding: 5 }

  return (
    <div style={background}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <UserPanel style={padding} />
    </div>
  )
}

export default Navigation
