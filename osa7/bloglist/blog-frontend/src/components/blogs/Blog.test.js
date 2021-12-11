import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Title text',
  author: 'Jorkki',
  url: 'testurl',
  likes: 666
}

test('renders content', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const element = component.getByText(
    'Title text Jorkki'
  )

  expect(element).toBeDefined()
})

test('clicking the view button shows url and likes', async () => {
  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'testurl'
  )

  expect(component.container).toHaveTextContent(
    '666'
  )
})

test('clicking the like button two times calls callback twice', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})