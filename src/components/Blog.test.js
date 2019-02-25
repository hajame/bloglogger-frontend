import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<SimpleBlog />', () => {
  let component

  beforeEach(() => {

    const blog = {
      title: 'Power and powerful powers',
      author: 'Max Henry',
      likes: 999,
      user: {
        username: 'parker'
      }
    }
    const user = 'parker'
    component = render(
      <Blog key={blog.id}
        blog={blog}
        handleLike={jest.fn()}
        handleDelete={jest.fn()}
        user={user}
        ref={React.createRef()}
      />
    )
  })

  it('renders only blog title and author when untouched', () => {
    const blogInfo = component.container.querySelector('.blog')

    expect(blogInfo).toHaveTextContent(
      'Power and powerful powers'
    )
    expect(blogInfo).toHaveTextContent(
      'Max Henry'
    )
    expect(blogInfo).not.toHaveTextContent(
      '999'
    )
    expect(blogInfo).not.toHaveTextContent(
      'added by'
    )
  })

  it('renders more information when clicked', () => {

    const blogInfo = component.container.querySelector('.blog')
    fireEvent.click(blogInfo)
    expect(blogInfo).toHaveTextContent(
      'Power and powerful powers'
    )
    expect(blogInfo).toHaveTextContent(
      'Max Henry'
    )
    expect(blogInfo).toHaveTextContent(
      '999'
    )
    expect(blogInfo).toHaveTextContent(
      'added by'
    )
  })
})