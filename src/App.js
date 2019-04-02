import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginFrom from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useField } from './hooks/index'
import { setNotification } from './reducers/notificationReducer.js'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  // const [notification, setNotification] = useState({
  //   message: null
  // })
  const [user, setUser] = useState(null)
  const [createFormVisible, setCreateFormVisible] = useState(false)

  const hideWhenVisible = { display: createFormVisible ? 'none' : '' }
  const showWhenVisible = { display: createFormVisible ? '' : 'none' }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => (b.likes - a.likes)))
    )
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
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 3000)
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
      // setTimeout(() => {
      //   setErrorMessage(null)
      //  }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    let newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    newBlog = await blogService.create(newBlog)
    newBlog.user = user
    title.reset()
    author.reset()
    url.reset()
    setBlogs(blogs.concat(newBlog))
    notify(`a new blog ${newBlog.title} by ${newBlog.author} added!`)
  }

  const handleLike = (id) => async (event) => {
    event.preventDefault()
    let oldBlog = blogs.find(b => b.id === id)
    let blogToUpdate = {
      ...oldBlog,
      likes: oldBlog.likes + 1
    }
    const newBlog = await blogService.update(blogToUpdate.id, blogToUpdate)

    // UPDATE BLOGLIST
    setBlogs(blogs
      .map(blog => blog.id === newBlog.id ? newBlog : blog)
      .sort((a, b) => (b.likes - a.likes))
    )
    // TODO only send success message if backend succeeds
    notify(`blog ${newBlog.title} by ${newBlog.author} liked!`)
  }

  const handleDelete = (id) => async (event) => {
    event.preventDefault()
    const blogToDelete = blogs.find(b => b.id === id)
    if (window.confirm(
      `YOU ARE ENTERING THE DANGER ZONE!
      Really remove blog ${blogToDelete.title} by ${blogToDelete.author} ?`)) {
      await blogService.remove(blogToDelete.id)

      // UPDATE BLOGLIST
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))

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
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
