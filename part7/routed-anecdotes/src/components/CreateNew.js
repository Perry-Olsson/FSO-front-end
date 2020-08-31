import React, { useState } from 'react'
import { useField } from '../hooks'
import { Redirect } from 'react-router-dom'

const CreateNew = (props) => {
  const [redirect, setRedirect] = useState(null)
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setRedirect('/')
  }

  return redirect ?
    <Redirect to={redirect} /> :
    (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type="submit">create</button><button id="reset" type='reset'>reset</button>
        </form>
      </div>
    )

}

export default CreateNew