const { gql } = require('apollo-server-express');

module.exports = gql`
  type Stock {
    id: ID!
    username: String!
    createdAt: String!
    closingPrice: [Float]!
    timeStamp: [Int]!
    news: [News]!
    participantInfo: Participant!
    cdecisions: [Int]!
    money: [Float]
  }
  
  type User {
    id: ID!
    token: String!
    username: String!
    createdAt: String!
  }
  
  type News {
    id: ID!
    newsText: String!
    newsID: Int!
    priceEffect: Int!
  }

  type Participant {
    id: ID!
    status: String!
    sequence: [Int]!
    controlGroup: Int!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getStocks: [Stock]
    getStock(stockId: ID!): Stock
    getAllNews: [News]
    getNews(newsId: ID!): News
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createStock(ticker: String!, prob: String!): Stock!
    updateStock(stockId: ID!, 
      timeStamp: [Int]!,
      cdecisions: [Int]!,
      money: [Float],): Stock!
    deleteStock(stockId: ID!): String!
    registerNews(newsText: String!, priceEffect: Int!): News!
    deleteNews(id: ID!): News!
    updateNews(id: ID!, newsText: String!, newsID: Int!, priceEffect: Int!): News!
  }

  type Subscription {
    newStock: Stock!
  }
`;

// const { gql } = require('apollo-server');

// module.exports = gql`
//   type Stock {
//     id: ID!
//     username: String!
//     createdAt: String!
//     closingPrice: [Float]!
//     predictedPrice: [Float]!
//     prediction: [Int]!
//     decisions: [Int]!
//     timeStamp: [Int]!
//     news: [String]!
//     cprediction: [Int]!
//     cdecisions: [Int]!
//     prob: String!
//     money: [Float]
//   }
  
//   type User {
//     id: ID!
//     token: String!
//     username: String!
//     createdAt: String!
//   }

//   input RegisterInput {
//     username: String!
//     password: String!
//     confirmPassword: String!
//   }

//   type Query {
//     getStocks: [Stock]
//     getStock(stockId: ID!): Stock
//   }

//   type Mutation {
//     register(registerInput: RegisterInput): User!
//     login(username: String!, password: String!): User!
//     createStock(ticker: String!, prob: String!): Stock!
//     updateStock(stockId: ID!,
//       decisions: [Int]!, 
//       timeStamp: [Int]!,
//       cprediction: [Int]!,
//       cdecisions: [Int]!,
//       money: [Float],): Stock!
//     deleteStock(stockId: ID!): String!
//   }

//   type Subscription {
//     newStock: Stock!
//   }
// `;
