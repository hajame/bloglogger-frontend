import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {

  const [expand, setExpand] = useState(false)

  const toggleExpand = () => {
    setExpand(!expand)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {expand ?
        <div onClick={toggleExpand} className='blog'>
          <div>
            &quot;{blog.title}&quot; by: <i>{blog.author}</i>
          </div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>
            added by {blog.user.name}
          </div>
          {user === blog.user.username ?
            <div>
              Danger zone: <button onClick={handleDelete}>remove</button>
            </div> :
            <div></div>
          }
        </div>
        :
        <div onClick={toggleExpand} className='blog'>
          &quot;{blog.title}&quot; by <i>{blog.author}</i>
        </div>
      }
    </div>
  )
}

export default Blog