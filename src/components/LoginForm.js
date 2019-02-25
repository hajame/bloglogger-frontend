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
        <input {...props.password} />
      </div>
      <button type='submit'>Log in</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm