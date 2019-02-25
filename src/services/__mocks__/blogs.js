let token = null

const blogs = [
  {
    id: '5c7128f8c3c35275f8e3bd90',
    user: {
      id: '5c34b4cc37464b6142a2d628',
      username: 'mononoke',
      name: 'Sen'
    },
    title: 'Wonderours wonders',
    author: 'Michael M. Ellisson',
    url: 'https://www.google.com',
    likes: 0
  },
  {
    id: '5c712ecbc3c35275f8e3bd93',
    user: {
      _id: '5c712e6dc3c35275f8e3bd92',
      username: 'testHessu',
      name: 'Hessu'
    },
    title: 'TestHessu\'s Blog',
    author: 'Hessu',
    url: 'https://www.kaleva.fi',
    likes: 0
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }