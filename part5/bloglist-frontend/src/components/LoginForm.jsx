const LoginForm = ({username, password, setUsername, setPassword, handleLogin}) => {
  return (
      <form onSubmit={handleLogin}>
              <h2>log in to application</h2>
          <div>
              username:
              <input type="test" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
          </div>
          <div>
              password:
              <input type="test" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
    </form>
  )
}

export default LoginForm