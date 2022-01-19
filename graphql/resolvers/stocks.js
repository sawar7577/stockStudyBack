const { AuthenticationError, UserInputError } = require('apollo-server');
const Stock = require('../../models/Stock');
const News = require('../../models/News');
const Participant = require('../../models/Participant');

const checkAuth = require('../../util/check-auth');
// const controlNews = require('../../util/news');
const normalize = require('array-normalize');


module.exports = {
  Query: {
    async getStocks() {
      try {
        const stocks = await Stock.find().sort({ createdAt: -1 });
        return stocks;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getStock(_, { stockId }) {
      try {
        const stock = await Stock.findById(stockId);
        // const news = await News.find();
        console.log("stock-->", stock);
        
        if (stock) {
          // stock.news = news;
          return stock;
        } else {
          throw new Error('Stock not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createStock(_, { ticker, prob}, context) {
      console.log(ticker, prob);
      const user = checkAuth(context);
      var price = new Array(100).fill(0);
      // var news = controlNews;
      var news = await News.find();
      var pnews = await Participant.findOne({status: "New"});

      // var newsString = [];
      // var newsPrice = [];
      // for(let i = 0 ; i < news.length ; ++i) {
      //   newsString.push(news[i].newsText);
      //   newsPrice.push(news[i].priceEffect);

      // }
      // const n =  await News.
      console.log(news);
      var decisions = new Array(100).fill(0);
      var timeStamp = new Array(100).fill(0);
      var cdecisions = new Array(100).fill(0);
      var money = new Array(100).fill(0);
      // var yourApiKey = process.env.APIKEY;
      // const alpha = require('alphavantage')({ key: yourApiKey });
      // try{
      //  await alpha.data.daily(ticker, 'compact', 'json', 'daily')
      //     .then(data => {
      //       var l = require('lodash');
      //       l.forEach(data['Time Series (Daily)'], function(value, key) {
      //         price.push(Number(value['4. close']));
      //       })
      //     }).catch(err => {
      //         console.error(err);
      //     });
      //   }catch (err) {
      //     throw new Error(err);
      //   }
        
        
            const newStock = new Stock({
              status: "InProgress",
              closingPrice: price,
              // decisions: decisions,
              timeStamp : timeStamp,
              news: news,
              participantInfo: pnews,
              // news: newsString,
              // priceEffect: newsPrice,
              cdecisions : cdecisions,
              money : money,
              user: user.id,
              username: user.username,
              createdAt: new Date().toISOString(),
            });
            console.log(newStock);
            const stock = await newStock.save();
            console.log("stockkk", stock);
            return stock;    
    },
    async updateStock(_, {timeStamp, cdecisions, money, stockId }) {
      try {
        console.log("updateing stock")
        const stock = await Stock.findById(stockId);
          // stock.decisions = decisions ;
          stock.timeStamp = timeStamp ;
          stock.cdecisions = cdecisions ;
          stock.money = money ;
          stock.status = "Completed";
          // console.log("update stock", stock);
          await stock.save();

        const participant = await Participant.findById(stock.participantInfo.id);
        participant.status = "Completed";
        await participant.save();

          return stock;
      } catch (err) {
        throw new Error(err);
      }
        
        
    },
    async deleteStock(_, { stockId }, context) {
      const user = checkAuth(context);

      try {
        const stock = await Stock.findById(stockId);
        if (user.username === stock.username) {
          await stock.delete();
          return 'Stock deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Subscription: {
    newStock: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_STOCK')
    }
  }
};
