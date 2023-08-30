import Blog from "./Blog"

const Blogs = (props) => {
     const hide = { display: props.newBlogVisible ? 'none' : '' }
    const show = { display: props.newBlogVisible ? '' : 'none' }
  return (
      <div>
          <h2>blogs</h2>
          <p>{props.user.username} logged in 
              <button onClick={props.handleLogout}>logout</button></p>
          
          <div style={hide}>
              <button onClick={()=> props.setBlogVisible(true)}>new note</button>
          </div>

        <div style={show}>
            <h2>create new</h2>
            
            <p>title: <input type="text" name="title" onChange={props.handleNewBlogChange} /></p>
            <p>author: <input type="text" name="author" onChange={props.handleNewBlogChange} /></p>
              <p>url: <input type="url" name="url" onChange={props.handleNewBlogChange} /></p>
              
            <button onClick={props.addBlog}>create</button><br/>
            <button onClick={()=>props.setBlogVisible(false)}>cancel</button>
        </div>
        {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )
}

export default Blogs