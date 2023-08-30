import { useState } from "react"

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const show = { display: visible ? '' : 'none' }
  return (
    <div className="blog">
    {props.blog.title} by {props.blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? "hide" : "view"}</button>
      <div style={show}>
        {props.blog.url}<br />
        {props.blog.likes}<br />
        {/* {props.blog.user.name}<br /> */}
      </div>
  </div> ) 
}

export default Blog