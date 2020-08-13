const mapAndSortBlogs = (blogs, blog=null) => {
  const mappedBlogs = mapBlogs(blogs, blog)
  if (mappedBlogs.length < 2)
    return mappedBlogs
  return mappedBlogs.sort((a, b) => b.likes - a.likes)
}

const mapBlogs = (blogs, blog) => blog ?
  blogs.map(b => b.id === blog.id ? blog : b) :
  [...blogs]

export default { mapAndSortBlogs }