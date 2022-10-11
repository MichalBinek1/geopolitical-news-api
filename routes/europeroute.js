const express = require('express')
const router = express.Router()

const europecontr = require('../controllers/europecontr')


router.get('/unews', europecontr.ukrHTML)

module.exports = router