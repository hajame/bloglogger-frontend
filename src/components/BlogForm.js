import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleCreation,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>add new</h2>

      <form onSubmit={handleCreation}>

        <div>title:
          <input type="text" value={title.value} name="title"
            onChange={title.onChange} />
        </div>

        <div>author:
          <input type="text" value={author.value} name="author"
            onChange={author.onChange} />
        </div>
        <div>url:
          <input type="text" value={url.value} name="url"
            onChange={url.onChange} />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleCreation: PropTypes.func.isRequired,
}

export default BlogForm