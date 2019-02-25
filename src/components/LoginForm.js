import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={props.handleLogin}>
      <div className='usernameField'>
        username
        <input
          value={props.username.value}
          type={props.username.type}
          onChange={props.username.onChange}
        />
      </div>
      <div>
        password
        <input
          value={props.password.value}
          type={props.password.type}
          onChange={props.password.onChange}        
        />
      </div>
      <button type='submit'>Log in</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm