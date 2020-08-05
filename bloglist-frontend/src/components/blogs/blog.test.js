import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Top ten blogs',
    author: 'Mr. Blog',
    url: 'www.tenbigblogs.com',
    user: { username: 'tester' }
  }

  const component = render(<Blog blog={blog} />)

  const viewButton = component.container.querySelector('.view')

  console.log(prettyDOM(viewButton))

  expect(component.container).toHaveTextContent('Top ten blogs')
})

test('view button works', () => {
  const blog = {
    title: 'Top ten blogs',
    author: 'Mr. Blog',
    url: 'www.tenbigblogs.com',
    user: { username: 'tester' }
  }

  const component = render(<Blog blog={blog} />)

  const viewButton = component.container.querySelector('.view')

  fireEvent.click(viewButton)

  console.log(prettyDOM(viewButton))

  expect(viewButton).toHaveTextContent('hide')
})