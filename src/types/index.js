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
  
  type Mutation {
    addBookmark(url: String!, title: String!): ResponseCode
    updateBookmark(url:String!, title: String!): ResponseCode
    deleteBookmark(url: String!): ResponseCode
  }
  
  type ResponseCode {
    resultCode: String
  }
`

module.exports = { typeDefs }

