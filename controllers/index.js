var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node Tunes' });
});

// GET: /about
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About this Site',
    content: 'This is some info about our music library'
  })
})


module.exports = router;
