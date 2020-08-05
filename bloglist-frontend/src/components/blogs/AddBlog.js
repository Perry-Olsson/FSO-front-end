import React, { useState } from 'react'
import './AddBlog.css'

const AddBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    setTitle('')
    setAuthor('')
    setUrl('')
    createBlog(newBlog)
  }

  return  (
    <form className='flex-column margin-bottom' onSubmit={addBlog}>
      <h2>Add New Blog</h2>
      <label>title: </label>
      <input
        type='text'
        name='Title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <label>author: </label>
      <input
        type='text'
        name='Author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <label>url: </label>
      <input
        type='text'
        name='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type='submit' style={{ 'marginTop': '1rem' }}>create</button>
    </form>
  )}


export default AddBlog