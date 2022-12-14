const axios = require('axios')
const cheerio = require('cheerio')

const newspapers = require('../newspapers')
const Article = require('../model/article')
const article = require('../model/article')
const articles = []
let date = new Date
exports.ukrHTML = (req, res, next) => {
    newspapers.forEach(newspaper => {
        axios.get(newspaper.address)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                let t = 0
                let index = 0
                $('a:contains("Ukraine")', html).each(function () {
                    var title = $(this).text().replaceAll('/n', '').trim()
                    var url = $(this).attr('href')

                    articles.push({
                        title: title,
                        url: newspaper.base + url,
                        source: newspaper.name,
                        date: date
                    })

                })

            }).then(()=>{
              
                for(let i = 0; i<articles.length - 1; i++){
                    if(i==articles.length){
                        break
                    }
                    for(let j = 0; j<articles.length - 1; j++){
                        if(articles[i].url == articles[j].url){
                            let title = articles[i].title
                            let url = articles[i].url
                            const article = new Article({
                                title: title,
                                url: url,
                                date: date
                            
                            })
                            if(i==j){
                                
                                
                                article.save()
                                continue
                                
                                
                            }
                            else{
                                
                                articles.splice(j,1)
                                console.log(articles[i])
                                
                                //article.save()
                            }
                            
                        }
                
                    }
                }
                //console.log(articles)
                res.json(articles)
            })
    })
}
    //console.log(newspapers)
    //res.json(articles)
// }
//setTimeout(()=>console.log(articles), 8000)
