const PORT = 7001
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const mongoose = require('mongoose')

const ukr = require('./routes/europeroute')

// app.use('/', (req, res) => {
//     res.json('Welcome to my Climate Change News API')
// })

app.use('/news', ukr)



mongoose
  .connect(
    'mongodb+srv://Olaf:Haslo123@articles.7bwvnno.mongodb.net/Articles?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
  })
  .catch(err => {
    console.log(err)
  })