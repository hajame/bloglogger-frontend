import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginFrom from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useField } from './hooks/index'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, like, createBlog, remove } from './reducers/blogReducer'

const App = (props) => {
  const blogs = props.blogs
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [user, setUser] = useState(null)
  const [createFormVisible, setCreateFormVisible] = useState(false)

  const hideWhenVisible = { display: createFormVisible ? 'none' : '' }
  const showWhenVisible = { display: createFormVisible ? '' : 'none' }

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    props.setNotification({ message, type })
    setTimeout(() => props.setNotification({ message: null, type: null }), 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    let blog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    props.createBlog({ blog, user })
    title.reset()
    author.reset()
    url.reset()
    notify(`a new blog ${blog.title} by ${blog.author} added!`)
  }

  const handleLike = (id) => async (event) => {
    event.preventDefault()
    let likedBlog = blogs.find(b => b.id === id)
    let blogToUpdate = {
      ...likedBlog,
      likes: likedBlog.likes + 1
    }
    props.like(blogToUpdate)

    // TODO only send success message if backend succeeds
    notify(`blog ${likedBlog.title} by ${likedBlog.author} liked!`)
  }

  const handleDelete = (id) => async (event) => {
    event.preventDefault()
    const blogToDelete = blogs.find(b => b.id === id)
    if (window.confirm(
      `YOU ARE ENTERING THE DANGER ZONE!
      Really remove blog ${blogToDelete.title} by ${blogToDelete.author} ?`)) {
      props.remove(blogToDelete)

      // TODO only send success message if backend succeeds
      notify(`blog ${blogToDelete.title} by ${blogToDelete.author} deleted!`)
    }
  }

  return (
    <div>
      <h1>Bloglogger</h1>
      <Notification notification={props.notification} />
      {user === null ?
        <LoginFrom
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
        :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Log out</button>

          <div style={hideWhenVisible}>
            <button onClick={() => setCreateFormVisible(true)}>Add Blog</button>
          </div>
          <div style={showWhenVisible}>
            <BlogForm
              handleCreation={handleCreation}
              author={author}
              title={title}
              url={url}
            />
            <button onClick={() => setCreateFormVisible(false)}>cancel</button>
          </div>
          <h2>blogs</h2>
          <div className='blogList'>
            {blogs.map(blog =>
              <Blog key={blog.id}
                blog={blog}
                handleLike={handleLike(blog.id)}
                handleDelete={handleDelete(blog.id)}
                user={user.username}
              />
            )}
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  like,
  createBlog,
  remove
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
