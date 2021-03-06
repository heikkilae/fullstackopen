import React, { useEffect, useState } from 'react'
import userService from './services/users'
import { useParams } from 'react-router-dom'

import UsersList from './components/users/UsersList'
import User from './components/users/User'

const Users = ({ basicPageBoxStyle }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  const id = useParams().id

  if (id) {
    const user = users.find(u => u.id === id)
    return (
      <User user={user} style={basicPageBoxStyle} />
    )
  }

  return (
    <UsersList users={users} style={basicPageBoxStyle} />
  )
}

export default Users