const axios = require('axios')

/**
 * from Pinboard API docs
 * "All API methods are GET requests, even when good REST habits suggest they should use a different verb."
 * https://www.pinboard.in/api/
 */

const addUpdate = async ({ pinboardToken, url, title }) => {
  const queryParams = [
    'format=json',
    `auth_token=${pinboardToken}`,
    `url=${url}`,
    `description=${title}`,
  ];
  return axios({
    url: `https://api.pinboard.in/v1/posts/add?${queryParams.join('&')}`,
    headers: {
      'Accept-Encoding': 'application/json'
    }
  })
}

const resolvers = {
  Query: {
    posts: async (parent, args, context) => {
      const { pinboardToken } = context
      const response = await axios({
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

      const { data } = await addUpdate({ pinboardToken, url, title })
      return {
        resultCode: data.result_code
      }
    },
    updateBookmark: async (parent, args, context) => {
      const { pinboardToken } = context
      const { title, url } = args

      const { data } = await addUpdate({ pinboardToken, url, title })
      return {
        resultCode: data.result_code
      }
    },
    deleteBookmark: async (parent, args, context) => {
      const { pinboardToken } = context
      const { url } = args

      const { data } = await axios({
        url: `https://api.pinboard.in/v1/posts/delete?auth_token=${pinboardToken}&url=${url}&format=json`,
        headers: {
          'Accept-Encoding': 'application/json'
        }
      })

      return {
        resultCode: data.result_code
      }
    },
  }
}

module.exports = { resolvers }
