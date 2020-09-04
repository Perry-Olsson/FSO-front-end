import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../../../../reducers/blogReducer'
import { createNotification } from '../../../../reducers/notificationReducer'
import blogService from '../../../../services/blogs'
import { Button } from 'react-bootstrap'
import './AddBlog.css'

const AddBlog = ({ toggleVisibility }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = await queryDb()
    if (newBlog) {
      dispatchAndToggleForm(newBlog)
    }
  }

  const queryDb = async () => {
    try {
      const newBlog = { title, author, url }
      return await blogService.addBlog(newBlog)
    } catch (exception) {
      exception.response ? dispatch(createNotification({ type: 'failure', message: exception.response.data.error }, 5))
        : console.log(exception)
      return null
    }
  }

  const dispatchAndToggleForm = (newBlog) => {
    clearForm()
    dispatch(addBlog(newBlog))
    dispatch(createNotification({ type: 'success', message: 'blog added' }, 5))
    toggleVisibility()
  }

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return  (
    <form id='addBlogForm' className='flex-column margin-bottom' onSubmit={createBlog}>
      <h2>Add New Blog</h2>
      <label>title: </label>
      <input
        id='title'
        type='text'
        name='Title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <label>author: </label>
      <input
        id='author'
        type='text'
        name='Author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <label>url: </label>
      <input
        id='url'
        type='text'
        name='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <Button id='createBlog' type='submit' style={{ 'marginTop': '1rem' }} variant="dark">create</Button>
    </form>
  )}


export default AddBlog