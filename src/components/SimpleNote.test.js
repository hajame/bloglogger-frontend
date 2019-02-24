import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

// Tee testi, joka varmistaa, 
// että komponentti renderöi
// blogin titlen, authorin ja likejen määrän.

// Lisää komponenttiin tarvittaessa
// testausta helpottavia CSS-luokkia.

describe('<SimpleBlog />', () => {
  let component


  afterEach(cleanup)
  beforeEach(() => {
    const blog = {
      title: 'Power and powerful powers',
      author: 'Max Henry',
      likes: 999
    }
    component = render(
      <SimpleBlog blog={blog} />
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
})