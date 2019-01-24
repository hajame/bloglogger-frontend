import React from 'react'
const Blog = ({blog}) => (
  <div>
    <a href={blog.url}>{blog.title}</a> by <i>{blog.author}</i>
  </div>  
)

export default Blog