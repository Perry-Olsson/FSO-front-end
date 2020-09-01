const mapAndSortBlogs = (blogs, blog=null) => {
  const mappedBlogs = mapBlogs(blogs, blog)
  if (mappedBlogs.length < 2)
    return mappedBlogs
  return mappedBlogs.sort((a, b) => b.likes - a.likes)
}

const mapBlogs = (blogs, blog) => blog ?
  blogs.map(b => b.id === blog.id ? blog : b) :
  [...blogs]

const mapAndSortUsers = (users) => {
  if(users.length < 2) return [...users]
  return [...users].sort((a, b) => b.blogs.length - a.blogs.length)
}

export default { mapAndSortBlogs, mapAndSortUsers }