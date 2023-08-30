import Blog from "./Blog"

const Blogs = ({ user, handleLogout, blogs, handleNewBlogChange, addBlog }) => {
  return (
      <div>
          <h2>blogs</h2>
          <p>{user.username} logged in 
              <button onClick={handleLogout}>logout</button></p>
          
          <h2>create new</h2>
          
              <p>title: <input type="text" name="title" onChange={handleNewBlogChange} /></p>
              <p>author: <input type="text" name="author" onChange={handleNewBlogChange} /></p>
            <p>url: <input type="url" name="url" onChange={handleNewBlogChange} /></p>
            <button onClick={addBlog}>create</button>
          

            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
          )}

        </div>
  )
}

export default Blogs