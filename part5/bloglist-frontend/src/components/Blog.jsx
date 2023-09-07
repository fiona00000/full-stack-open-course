import { useState } from "react"
import blogService from '../services/blogs'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const show = { display: visible ? '' : 'none' }

  const [likes, setLikes] = useState(props.blog.likes)
  const updateLike = () => {
    const updatedBlog = {
      ...props.blog,
      likes: props.blog.likes += 1
    }
    blogService.update(props.blog.id, updatedBlog)
    setLikes(likes+1)
  }

  const removeBlog = (id) => {
    const confirm = window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)
    if (confirm) {
      blogService
        .remove(id)
        .then(() => {
          props.handleBlogRemoval(id)
        })      
    }
  }  

  return (
    <div style={blogStyle}>
    <p className="title_author">{props.blog.title} by {props.blog.author}</p>
      <button onClick={() => setVisible(!visible)}>{visible ? "hide" : "view"}</button>
      <div style={show}>
        <p className="url_like"><a href={props.blog.url}>{props.blog.url}</a><br />
        likes {likes}</p> <button onClick={updateLike}>like</button><br />
        {/* {props.blog.user.name}<br /> */}
        <button onClick={()=>removeBlog(props.blog.id)}>remove</button>
      </div>
  </div> ) 
}

export default Blog