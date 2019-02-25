import React from 'react'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs') // move to setupTests.js
import App from './App'

describe('<App />', () => {
  it('renders only login fields if not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(0)
    expect(component.container).toHaveTextContent('username')
  })
  it('renders blogs if logged in', async () => {
    const user =  {
      token: '123123123',
      username: 'testHessu',
      name: 'Hessu'
    }
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(() => component.container.querySelector('.blog'))

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)
    expect(component.container).toHaveTextContent('Wonderours wonders')
    expect(component.container).toHaveTextContent('TestHessu\'s Blog')
  })
})