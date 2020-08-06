import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import AddBlog from './AddBlog'

describe('Blog component', () => {
  test('renders content', () => {
    const blog = {
      title: 'Top ten blogs',
      author: 'Mr. Blog',
      url: 'www.tenbigblogs.com',
      user: { username: 'tester' }
    }

    const component = render(<Blog blog={blog} />)

    const blogInfo = component.container.querySelector('.blogInfoTest')
    const likes = component.container.querySelector('.likesTest')
    const url = component.container.querySelector('.urlTest')

    expect(blogInfo).toHaveTextContent('Top ten blogs | Mr. Blog')
    expect(likes).toBe(null)
    expect(url).toBe(null)
  })

  test('view button', () => {
    const blog = {
      title: 'Top ten blogs',
      author: 'Mr. Blog',
      likes: '10',
      url: 'www.tenbigblogs.com',
      user: { username: 'tester' }
    }

    const component = render(<Blog blog={blog} />)

    const viewButton = component.container.querySelector('.view')

    let likes = component.container.querySelector('.likesTest')
    expect(likes).toBe(null)

    fireEvent.click(viewButton)

    likes = component.container.querySelector('.likesTest')
    const url = component.container.querySelector('.urlTest')

    expect(viewButton).toHaveTextContent('hide')
    expect(likes).toHaveTextContent('10')
    expect(url).toHaveTextContent('www.tenbigblogs.com')
  })

  test('like button', () => {
    const blog = {
      title: 'Top ten blogs',
      author: 'Mr. Blog',
      likes: '10',
      url: 'www.tenbigblogs.com',
      user: { username: 'tester' }
    }

    const mockLikeHandler = jest.fn()

    const component = render(<Blog blog={blog} likeBlog={mockLikeHandler} />)
    const viewButton = component.container.querySelector('.view')

    fireEvent.click(viewButton)

    const likeButton = component.container.querySelector('.likes')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})

describe('AddBlog Component', () => {
  test('form submits succesfully', () => {
    const addBlogHandler = jest.fn()

    const component = render(<AddBlog createBlog={addBlogHandler} />)

    const titleField = component.container.querySelector('#title')
    const authorField = component.container.querySelector('#author')
    const urlField = component.container.querySelector('#url')
    const form = component.container.querySelector('#addBlogForm')

    fireEvent.change(titleField, {
      target: { value: 'My Heart Will Go On' }
    })
    fireEvent.change(authorField, {
      target: { value: 'Celine Dion' }
    })
    fireEvent.change(urlField, {
      target: { value: 'www.titanic.com' }
    })
    fireEvent.submit(form)

    expect(addBlogHandler.mock.calls[0][0]).toEqual({
      title: 'My Heart Will Go On',
      author: 'Celine Dion',
      url: 'www.titanic.com'
    })
    expect(addBlogHandler.mock.calls).toHaveLength(1)
  })
})
