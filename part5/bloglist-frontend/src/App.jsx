import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [newBlogVisible, setBlogVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({})
  const [notification, setNotification] = useState({message: '', type: null})
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initBlogs =>
        setBlogs( initBlogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setNotification({message: 'Wrong username or password', type: "error"})
      setTimeout(() => {
        setNotification({message: '', type: null})
      },5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleNewBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog((prevContent => ({
      ...prevContent,
      [name]: value
    })))
  }

  const addBlog = () => {
    const newObj = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        userId:user.id
    }
    blogService.create(newObj)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({})
        setNotification({ message: `a new blog  ${returnedBlog.title} by ${returnedBlog.author} added`, type: "success" })

        setTimeout(() => {
        setNotification({message: '', type: null})
      },5000)
      })
    .then(()=>setBlogVisible(false))
  }

  return (
    <div>
      <Notification message={notification} />

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
        :
        <Blogs user={user}
          handleLogout={handleLogout}
          blogs={blogs}
          handleNewBlogChange={handleNewBlogChange}
          addBlog={addBlog}
          newBlogVisible={newBlogVisible}
          setBlogVisible={setBlogVisible}
        />        
      }
    </div>
  )
}

export default App