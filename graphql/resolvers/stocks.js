const { AuthenticationError, UserInputError } = require('apollo-server');
const Stock = require('../../models/Stock');
const checkAuth = require('../../util/check-auth');
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
        if (stock) {
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
      const user = checkAuth(context);
      var price = [];
      var prediction = new Array(100).fill(0);
      var predictedPrice = new Array(100).fill(0);
      var decisions = new Array(100).fill(0);
      var timeStamp = new Array(100).fill(0);
      var cprediction = new Array(100).fill(0);
      var cdecisions = new Array(100).fill(0);
      var money = new Array(100).fill(0);
      var yourApiKey = process.env.APIKEY;
      const alpha = require('alphavantage')({ key: yourApiKey });
      try{
       await alpha.data.daily(ticker, 'compact', 'json', 'daily')
          .then(data => {
            var l = require('lodash');
            l.forEach(data['Time Series (Daily)'], function(value, key) {
              price.push(Number(value['4. close']));
            })
          }).catch(err => {
              console.error(err);
          });
        }catch (err) {
          throw new Error(err);
        }
        normalize(price);
        for(var i=0; i<99; i++)
        { 
          let va = Math.round(price[i]*10000);
          price[i]= va/10;
        }
        var p = prob === "80%" ? 0.8 : 0.7;
        
        for(var i=49; i<=80; i++)
        { 
          var r = Math.random();
          if(price[i+1]>=price[i])
          {
            if(r<=p)
            {
            prediction[i]= 1;
            predictedPrice[i] = price[i]+(price[i+1]-price[i])/2+(price[i+1]-price[i])*Math.random();
            }
            else
            {
              prediction[i]= 0;
              predictedPrice[i] = Math.max(10, price[i]-(price[i+1]-price[i])/2+(price[i+1]-price[i])*Math.random());
            }
          }
          else 
          {
            if(r<=p)
            {
            prediction[i]= 0;
            predictedPrice[i] = Math.max(10,price[i]+(price[i+1]-price[i])/2+(price[i+1]-price[i])*Math.random());
            }
            else
            {
              prediction[i]= 1;
              predictedPrice[i] =  price[i]-(price[i+1]-price[i])/2+(price[i+1]-price[i])*Math.random();
            }
          }
        }
        
            const newStock = new Stock({
              closingPrice: price,
              predictedPrice: predictedPrice,
              prediction: prediction,
              decisions: decisions,
              timeStamp : timeStamp,
              cprediction: cprediction,
              cdecisions : cdecisions,
              money : money,
              user: user.id,
              username: user.username,
              createdAt: new Date().toISOString(),
              prob:prob
            });
            const stock = await newStock.save();
            return stock;    
    },
    async updateStock(_, {decisions, timeStamp, cprediction, cdecisions, money, stockId }) {
      try {
        const stock = await Stock.findById(stockId);
          stock.decisions = decisions ;
          stock.timeStamp = timeStamp ;
          stock.cprediction = cprediction ;
          stock.cdecisions = cdecisions ;
          stock.money = money ;
          await stock.save();
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
