const axios = require('axios')
const cheerio = require('cheerio')

const newspapers = require('../newspapers')
const Article = require('../model/article')
const articles = []
exports.ukrHTML = (req, res, next) => {
    newspapers.forEach(newspaper => {
        axios.get(newspaper.address)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
    
                $('a:contains("Ukraine")', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
                    
                    const article = new Article({
                        title: title,
                        url: url
                    })
                    article
                      .save()
                      
                    articles.push({
                        title,
                        url: newspaper.base + url,
                        source: newspaper.name
                    })
                })
                res.json(articles)
            })
    })
    console.log(newspapers)
}