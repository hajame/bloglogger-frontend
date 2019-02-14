import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginFrom from './components/LoginForm'

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
    setNoteMessage(`a new blog ${newBlog.title} by ${newBlog.author} added!`)
    setTimeout(() => {
      setNoteMessage(null)
    }, 5000)
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

          <h2>create new</h2>
          <form onSubmit={handleCreation}>
            <div>title:
              <input type="text" value={title} name="title"
                onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>author:
              <input type="text" value={author} name="author"
                onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>url:
              <input type="text" value={url} name="url"
                onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type="submit">Create</button>
          </form>

          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App