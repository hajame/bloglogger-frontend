import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={props.handleLogin}>
      <div className='usernameField'>
        username
        <input {...props.username}/>
      </div>
      <div>
        password
        <input
          type='password'
          value={props.password}
          name='Password'
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button type='submit'>Log in</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  // setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  // username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm