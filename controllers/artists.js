// use express
let express = require('express')

// instantiate an express router to parse and direct url requests
let router = express.Router()

// add model ref
let Artist = require('../models/artist')

// GET: /artists => show index view
router.get('/', (req, res) => {
    // use Artist model to fetch all documents from artists collection in mongodb
    Artist.find((err, artists) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.render('artists/index', {
                artists: artists,
                title: 'Artists'
            })
        }
    })
})

// make public
module.exports = router