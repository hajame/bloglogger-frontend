import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='blog'>
    <div className='blogInfo'>
      {blog.title} {blog.author}
    </div>
    <div className='likeInfo'>
      blog has {blog.likes} likes
      <button onClick={onClick} className='likeButton'>like</button>
    </div>
  </div>
)

export default SimpleBlog