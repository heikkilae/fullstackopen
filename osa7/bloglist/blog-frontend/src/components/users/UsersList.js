import React from 'react'
import { Link } from 'react-router-dom'

const UserTable = ({ users }) => {
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
                <td>
                  <Link to={`/users/${user.id}`} > {user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>)}
          </tbody>
        </table>
        : null}
    </div>
  )
}

export default UserTable
