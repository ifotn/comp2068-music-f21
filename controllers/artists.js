// use express
const express = require('express')

// instantiate an express router to parse and direct url requests
const router = express.Router()

// add model ref
const Artist = require('../models/artist')

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

// GET: /artists/create => show new artist form
router.get('/create', (req, res) => {
    res.render('artists/create', {
        title: 'Add a New Artist'
    })
})

// POST: /artists/create => process form submission & save new Artist document
router.post('/create', (req, res) => {
    // use Mongoose model to create a new Artist document
    Artist.create({
        name: req.body.name
    }, (err, newArtist) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else { // save successful; update artists list view
            res.redirect('/artists')
        }
    })
})

// GET: /artists/delete/abc123 => delete artist with the _id parameter
router.get('/delete/:_id', (req, res) => {
    // get document id from url parameter
    let _id = req.params._id

    // use Mongoose to delete the document & redirect
    Artist.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/artists')
        }
    })
})

// GET: /artists/edit/abc123 => show pre-populated Edit form
router.get('/edit/:_id', (req, res) => {
    // read _id from url param
    let _id = req.params._id

    // query the db for the selected Artist document
    Artist.findById(_id, (err, artist) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            // load the edit view and pass the selected Artist doc to it for display
            res.render('artists/edit', {
                title: 'Artist Details',
                artist: artist
            })
        }
    })
})

// POST: /artists/edit/abc123 => update existing Artist doc with values from form submission
router.post('/edit/:_id', (req, res) => {
    // get document id from url param
    let _id = req.params._id

    // Use Mongoose findByIdAndUpdate to save changes to existing doc
    Artist.findByIdAndUpdate({ _id: _id}, { 'name': req.body.name }, null,(err, artist) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/artists')
        }
    })
})

// make public
module.exports = router