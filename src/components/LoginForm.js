import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {

  const username = { ...props.username }
  username.reset = undefined
  const password = { ...props.password }
  password.reset = undefined

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={props.handleLogin}>
        <div className='usernameField'>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm