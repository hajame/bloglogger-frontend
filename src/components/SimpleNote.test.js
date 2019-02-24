import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

// Tee testi, joka varmistaa, 
// että komponentti renderöi
// blogin titlen, authorin ja likejen määrän.

// Lisää komponenttiin tarvittaessa
// testausta helpottavia CSS-luokkia.

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Power and powerful powers',
    author: 'Max Henry',
    likes: 999
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Power and powerful powers'
  )
  expect(component.container).toHaveTextContent(
    'Max Henry'
  )
  expect(component.container).toHaveTextContent(
    '999'
  )
})