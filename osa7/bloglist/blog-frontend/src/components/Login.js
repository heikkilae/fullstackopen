import React from 'react'
import PropTypes from 'prop-types'

const Login = ({
  username,
  password,
  handleUsername,
  handlePassword,
  handleLogin
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
        password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default Login