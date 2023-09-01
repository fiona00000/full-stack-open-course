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
    console.log("num like: ", props.blog.likes)
    const updatedBlog = {
      ...props.blog,
      likes: props.blog.likes += 1
    }
    blogService.update(props.blog.id, updatedBlog)
    setLikes(likes+1)
  }

  return (
    <div style={blogStyle}>
    {props.blog.title} by {props.blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? "hide" : "view"}</button>
      <div style={show}>
        {props.blog.url}<br />
        likes {likes} <button onClick={updateLike}>like</button><br />
        {props.blog.user.name}<br />
      </div>
  </div> ) 
}

export default Blog