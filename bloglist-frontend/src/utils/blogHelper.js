const mapAndSortBlogs = (blogs, blog=null) => {
  const mappedBlogs = mapBlogs(blogs, blog)
  if (mappedBlogs.length < 2)
    return [...blogs]
  return mappedBlogs.sort((a, b) => b.likes - a.likes)
}

const mapBlogs = (blogs, blog) => blog ?
  blogs.map(b => b.id === blog.id ? blog : b) :
  [...blogs]

// const sortBlogs = (blogs) => {
//     if (blogs.length < 2)
//         return [...blogs]
//     return [...blogs].sort((a, b) => b.likes - a.likes)
// }

export default { mapAndSortBlogs }