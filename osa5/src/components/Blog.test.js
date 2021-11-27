import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Title text',
    author: 'Jorkki'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const element = component.getByText(
    'Title text Jorkki'
  )

  expect(element).toBeDefined()
})