import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='blog'>
    <div className='blogInfo'>
      {blog.title} {blog.author}
    </div>
    <div className='likeInfo'>
      blog has {blog.likes} likes
      <button className='likeButton' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog