const getLoggedUser = () => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUser)
  return `bearer ${user.token}`
}

export default { getLoggedUser }