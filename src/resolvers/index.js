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
  Mutation: {
    addBookmark: async (parent, args, context) => {
      const { pinboardToken } = context
      const { title, url } = args

      const queryParams = [
        'format=json',
        `auth_token=${pinboardToken}`,
        `url=${url}`,
        `description=${title}`,
      ];
      const response = await axios({
        method: 'POST',
        url: `https://api.pinboard.in/v1/posts/add?${queryParams.join('&')}`,
        headers: {
          'Accept-Encoding': 'application/json'
        }
      })
      return {
        resultCode: response.data.result_code
      }
    }
  }
}

module.exports = { resolvers }
