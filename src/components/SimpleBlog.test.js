import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  let onClick

  beforeEach(() => {
    const blog = {
      title: 'Power and powerful powers',
      author: 'Max Henry',
      likes: 999
    }
    onClick = jest.fn()
    component = render(
      <SimpleBlog blog={blog} onClick={onClick} />
    )
  })

  it('renders blog information', () => {
    const blogInfo = component.container.querySelector('.blogInfo')
    expect(blogInfo).toHaveTextContent(
      'Power and powerful powers'
    )
    expect(blogInfo).toHaveTextContent(
      'Max Henry'
    )
  })

  it('renders likes information', () => {
    const likeInfo = component.container.querySelector('.likeInfo')
    expect(likeInfo).toHaveTextContent(
      '999'
    )
  })

  it('calls like-adding function each time the like button is pressed', async () => {
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(onClick.mock.calls.length).toBe(2)
  })
})