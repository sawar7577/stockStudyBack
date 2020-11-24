const { gql } = require('apollo-server');

module.exports = gql`
  type Stock {
    id: ID!
    username: String!
    createdAt: String!
    closingPrice: [Float]!
    prediction: [Int]!
    decisions: [Int]!
  }
  
  type User {
    id: ID!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getStocks: [Stock]
    getStock(stockId: ID!): Stock
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createStock(ticker: String!): Stock!
    updateStock(stockId: ID!, decisions: [Int]!): Stock!
    deleteStock(stockId: ID!): String!
  }

  type Subscription {
    newStock: Stock!
  }
`;
