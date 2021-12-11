import React, { useEffect, useState } from 'react'
import userService from './services/users'


const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  return (
    <div>
      <h2>Users</h2>
      {users && users.length > 0 ?
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>)}
          </tbody>
        </table>
        : null}
    </div>
  )
}

export default Users