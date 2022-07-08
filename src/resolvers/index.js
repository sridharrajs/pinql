const axios = require('axios')

const resolvers = {
  Query: {
    posts: async (parent, args, context) => {
      const { pinboardToken } = context
      const response = await axios({
        method: 'get',
        url: `https://api.pinboard.in/v1/posts/recent?auth_token=${pinboardToken}&format=json`,
        headers: {
          'Accept-Encoding': 'application/json'
        }
      })

      const { posts } = response.data
      return posts
    }
  },
}

module.exports = { resolvers }
