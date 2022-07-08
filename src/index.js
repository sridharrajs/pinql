const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const { typeDefs } = require('./types')
const { resolvers } = require('./resolvers')

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  context: ({ req }) => {
    const pinboardToken = req.headers['x-pinboard-token']

    return {
      req,
      pinboardToken
    }
  }
});

server.applyMiddleware({
  app,
  path: '/graphql',
})

module.exports = { app }
