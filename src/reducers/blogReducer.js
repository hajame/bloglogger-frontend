import blogService from '../services/blogs'

export const createBlog = ({ blog, user }) => {
  return async dispatch => {

    let newBlog = await blogService.create(blog)
    newBlog.user = user
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const like = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const remove = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      data: blog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE':
    return state
      .map(blog => blog.id !== action.data.id ? blog : action.data)
      .sort((a, b) => b.likes - a.likes)
  case 'REMOVE':
    return state
      .filter(blog => blog.id !== action.data.id)
      .sort((a, b) => b.likes - a.likes)
  case 'NEW_BLOG':
    return state
      .concat(action.data)
      .sort((a, b) => b.likes - a.likes)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export default blogReducer
