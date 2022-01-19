
const News = require('../../models/News');

module.exports = {
    Query: {
        async getAllNews() {
            try {
                const news = await News.find();
                console.log("news-->",news);    
                return news;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getNews(_, { newsId }) {
            try {
                const news = await News.findById(newsId);
                if(news) {
                    return news;
                } else {
                    throw new Error('News not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    
    Mutation: {
        async registerNews(_, {newsText, priceEffect}) {
            // console.log(newsText);  
            const registeredNews = new News({
                newsID: 1,
                newsText: newsText,
                priceEffect: priceEffect,
            });

            // console.log(newsInput, NewsString);
            console.log("registering ", newsText, priceEffect);
            const res = await registeredNews.save();
            return res;

        },

        async updateNews(_, {priceEffect, newsText, newsID, id}) {
            try {

                const news = await News.findById(id);
                news.priceEffect = priceEffect;
                news.newsText = newsText;
                news.newsID =  newsID;
                console.log(news);
                console.log("updating news", priceEffect, newsText, newsID, id);
                await news.save();
                return news;
            } catch (err) {
                throw new Error(err);
            }
        },

        async deleteNews(_, {id}) {
            try {
                const news = await News.findById(id);
                console.log("deleting", id);
                await news.delete();
                return {
                    id: id
                };
            } catch (err) {
                throw new Error(err);
            }
        }

    }
};