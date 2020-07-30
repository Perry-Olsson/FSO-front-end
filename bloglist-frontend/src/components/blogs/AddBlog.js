import React from 'react'
import './AddBlog.css'

const AddBlog = ({ info, handleNewBlog }) => (
    <form className='flex-column margin-bottom' onSubmit={handleNewBlog}>
            <h2>Add New Blog</h2>
            <label>title: </label>
            <input
                type='text'
                name='Title'
                value={info.title}
                onChange={({ target }) => info.setTitle(target.value)}
            />
            <label>author: </label>
            <input 
                type='text'
                name='Author'
                value={info.author}
                onChange={({ target }) => info.setAuthor(target.value)}
            />
            <label>url: </label>
            <input 
                type='text'
                name='url'
                value={info.url}
                onChange={({ target }) => info.setUrl(target.value)}
            />
            <button type='submit' style={{'marginTop': '1rem'}}>Create</button>
    </form>
)

export default AddBlog