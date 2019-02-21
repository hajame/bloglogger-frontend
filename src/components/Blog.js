import React, { useState, useImperativeHandle } from 'react'
const Blog = ({ blog, ref }) => {

  const [expand, setExpand] = useState(false)

  const toggleExpand = () => {
    setExpand(!expand)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleExpand
    }
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      { expand ?
        <div onClick={toggleExpand}>
          <div>
            &quot;{blog.title}&quot; by: <i>{blog.author}</i>
          </div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} <button>like</button>
          </div>
          <div>
            added by {blog.user.name}
          </div>
        </div>
        :
        <div onClick={toggleExpand}>
          &quot;{blog.title}&quot; by <i>{blog.author}</i>
        </div>
      }
    </div>
  )
}

export default Blog