const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const News = require('./models/News');
const Counter = require('./models/Counter');
const Participant = require('./models/Participant');

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// for(var i = 0 ; i < 30 ; ++i) {
//   sarr = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
//   var num = 0;
//   while(num < 5) {
//     var randIdx = Math.floor(Math.random() * sarr.length)
//     if(sarr[randIdx] > 0){
//       sarr[randIdx] = -sarr[randIdx];
//       num++; 
//     }
//   } 
//   var p = new Participant({
//     status: "New",
//     sequence: sarr,
//     controlGroup: 1
//   })

//   p.save();
//   // console.log(res);

//   var p1 = new Participant({
//     status: "New",
//     sequence: sarr,
//     controlGroup: 2
//   })

//   p1.save();

//   for(var j = 0 ; j < sarr.length ; ++j) {
//     sarr[j] = -sarr[j];
//   }
//   var p2 = new Participant({
//     status: "New",
//     sequence: sarr,
//     controlGroup: 3
//   })

//   p2.save();

//   console.log(sarr);
// }

// console.log(arr);


// console.log(News.schema);
const pubsub = new PubSub();
const PORT = process.env.PORT || 5000
const server = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
