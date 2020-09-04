import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

const Blog = ({ blog }) => (
  <Card style={{ width: '40rem', margin:'2em 0', borderColor: '#aaaaaa' }} className={`${blog.title.replace(/ /gm, '-')}`}>
    <Card.Body style={{ display: 'flex',  height: '7em', justifyContent: 'space-between', alignItems: 'center' }}>
      <Card.Title id='blogInfo' style={{ fontSize: '1.5rem',  paddingRight: '2em', margin: 0 }}>{blog.title} | {blog.author}</Card.Title>
      <Link to={`/blogs/${blog.id}`}><Button variant="info" className='view'>view</Button></Link>
    </Card.Body>
  </Card>
)

export default Blog
