import { useState } from "react"

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

  return (
    <div style={blogStyle}>
    {props.blog.title} by {props.blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? "hide" : "view"}</button>
      <div style={show}>
        {props.blog.url}<br />
        likes {props.blog.likes} <button>like</button><br />
        {props.blog.user.name}<br />
      </div>
  </div> ) 
}

export default Blog