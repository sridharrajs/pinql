const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    posts: [Post]
  }
  type Post {
    href: String
    description: String
    meta: String
    extended: String
    hash: String
    time: String
    shared: String
    toread: String
    tags: String
  }
`

module.exports = { typeDefs }

