const LoginForm = (props) => {
  return (
      
              <form onSubmit={props.handleLogin}>
              <h2>log in to application</h2>
          <div>
              username:
              <input type="test" value={props.username} name="Username" onChange={props.handleUsernameChange} />
          </div>
          <div>
              password:
              <input type="password" value={props.password} name="Password" onChange={props.handlePasswordChange} />
          </div>
                  <button type="submit">login</button>
    </form>
  )
}

export default LoginForm