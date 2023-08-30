import React from 'react'

const NewBlogForm = (props) => {
  return (
      <div>
          <h2>create new</h2>
            
            <p>title: <input type="text" name="title" onChange={props.handleNewBlogChange} /></p>
            <p>author: <input type="text" name="author" onChange={props.handleNewBlogChange} /></p>
              <p>url: <input type="url" name="url" onChange={props.handleNewBlogChange} /></p>
              
            <button onClick={props.addBlog}>create</button><br/>
            <button onClick={()=>props.setBlogVisible(false)}>cancel</button>
    </div>
  )
}

export default NewBlogForm