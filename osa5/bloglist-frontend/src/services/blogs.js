import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = (user) => `bearer ${user.token}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (user, newBlog) => {
  const config = {
    headers: { Authorization: getToken(user) }
  }

  return (axios
    .post(`${baseUrl}`, newBlog, config)
    .then(response => response.data))
}

export default { getAll, create }