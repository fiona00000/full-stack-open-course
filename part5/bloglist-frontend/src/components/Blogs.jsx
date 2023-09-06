import { useState } from "react"
import blogService from "../services/blogs"
import Blog from "./Blog"
import NewBlogForm from "./NewBlogForm"

const Blogs = (props) => {
    const [newBlogVisible, setBlogVisible] = useState(false)
    const [newBlog, setNewBlog] = useState({})
    const hide = { display: newBlogVisible ? 'none' : '' }
    const show = { display: newBlogVisible ? '' : 'none' }

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
            userId: props.user.id
        }
        blogService.create(newObj)
            .then(returnedBlog => {
                console.log(returnedBlog)
                props.setBlogs(props.blogs.concat(returnedBlog))
                setNewBlog({})
                props.setNotification({ message: `a new blog  ${returnedBlog.title} by ${returnedBlog.author} added`, type: "success" })

                setTimeout(() => {
                    props.setNotification({message: '', type: null})
                },5000)
            })
        .then(()=>setBlogVisible(false))
    }

    const handleBlogRemoval = (id) => {
        props.setBlogs(props.blogs.filter(blog => blog.id !== id))
    }
    
  return (
      <div>
          <h2>blogs</h2>
          <p>{props.user.username} logged in 
              <button onClick={props.handleLogout}>logout</button></p>
          
          <div style={hide}>
              <button onClick={()=> setBlogVisible(true)}>create new blog</button>
          </div>

        <div style={show}>
              <NewBlogForm
                  handleNewBlogChange={handleNewBlogChange}
                  addBlog={addBlog}
                  setBlogVisible={setBlogVisible}/>
        </div>
        {props.blogs.map(blog =>
            <Blog
                key={blog.id}
                blog={blog}
                handleBlogRemoval={handleBlogRemoval}/>
        )}
      </div>
  )
}

export default Blogs