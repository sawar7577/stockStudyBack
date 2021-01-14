const stocksResolvers = require('./stocks');
const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...stocksResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...stocksResolvers.Mutation,
  },
  Subscription: {
    ...stocksResolvers.Subscription
  }
};
