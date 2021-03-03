const { gql } = require('apollo-server');

module.exports = gql`
  type Stock {
    id: ID!
    username: String!
    createdAt: String!
    closingPrice: [Float]!
    predictedPrice: [Float]!
    prediction: [Int]!
    decisions: [Int]!
    timeStamp: [Int]!
    cprediction: [Int]!
    cdecisions: [Int]!
    prob: String!
    money: [Float]
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
    createStock(ticker: String!, prob: String!): Stock!
    updateStock(stockId: ID!,
      decisions: [Int]!, 
      timeStamp: [Int]!,
      cprediction: [Int]!,
      cdecisions: [Int]!,
      money: [Float],): Stock!
    deleteStock(stockId: ID!): String!
  }

  type Subscription {
    newStock: Stock!
  }
`;
