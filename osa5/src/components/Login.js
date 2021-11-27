import React from 'react'

const Login = ({username, password, handleUsername, handlePassword, handleLogin}) => {
  return (
    <div>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsername}
          />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePassword}
          />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
  )
}

export default Login