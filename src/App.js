import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginFrom from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [noteMessage, setNoteMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [createFormVisible, setCreateFormVisible] = useState(false)

  const hideWhenVisible = { display: createFormVisible ? 'none' : '' }
  const showWhenVisible = { display: createFormVisible ? '' : 'none' }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => (a.likes - b.likes)).reverse())
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

  const showMessage = (message, time) => {
    setNoteMessage(message)
    setTimeout(() => {
      setNoteMessage(null)
    }, time)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    let newBlog = { title, author, url }
    newBlog = await blogService.create(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(blogs.concat(newBlog))
    showMessage(`a new blog ${newBlog.title} by ${newBlog.author} added!`, 5000)
  }

  const handleLike = (id) => async (event) => {
    event.preventDefault()
    let oldBlog = blogs.find(b => b.id === id)
    let blogToUpdate = {
      ...oldBlog,
      likes: oldBlog.likes + 1
    }
    console.log('oldLikes', oldBlog.likes)
    const newBlog = await blogService.update(blogToUpdate.id, blogToUpdate)
    console.log('UpdatedLikes', newBlog.likes)

    // UPDATE BLOGLIST
    setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog))
    // TODO only send success message if backend succeeds
    showMessage(`blog ${newBlog.title} by ${newBlog.author} liked!`, 5000)
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
      showMessage(`blog ${blogToDelete.title} by ${blogToDelete.author} deleted!`, 5000)
    }
  }

  return (
    <div>
      <h1>Bloglogger</h1>
      {errorMessage ? <div className='error'>{errorMessage}</div> : <div></div>}
      {noteMessage ? <div className='note'>{noteMessage}</div> : <div></div>}
      {user === null ?
        <LoginFrom
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        /> :
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
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
            />
            <button onClick={() => setCreateFormVisible(false)}>cancel</button>
          </div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id}
              blog={blog}
              handleLike={handleLike(blog.id)}
              handleDelete={handleDelete(blog.id)}
              user={user.username}
              ref={React.createRef()}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App