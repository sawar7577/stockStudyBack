const stocksResolvers = require('./stocks');
const usersResolvers = require('./users');
const newsResolvers = require('./news');


module.exports = {
  Query: {
    ...stocksResolvers.Query,
    ...newsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...stocksResolvers.Mutation,
    ...newsResolvers.Mutation,
  },
  Subscription: {
    ...stocksResolvers.Subscription
  }

};
