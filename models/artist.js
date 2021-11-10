// link to mongoose
const mongoose = require('mongoose')

// define a schema for artists
var artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    albums: [{
        title: String,
        year: Number,
        rating: Number
    }]
})

// make this model public with the name of Artist
module.exports = mongoose.model('Artist', artistSchema)