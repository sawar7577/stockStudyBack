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
<<<<<<< HEAD
    createStock(ticker: String!, prob: String!): Stock!
=======
    createStock(ticker: String!): Stock!
>>>>>>> 0d981e191552715386a538164330bbe346877203
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
