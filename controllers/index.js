var express = require('express');
var router = express.Router();

// passport for auth
const passport = require('passport')
const User = require('../models/user')

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

// GET: /register
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register'
  })
})

// POST: /register
router.post('/register', (req, res) => {
  // use User Model & passport to create a new user in MongoDB.  Send password separately so it can be hashed by passport
  User.register(new User({ username: req.body.username }), req.body.password, (err, newUser) => {
    if (err) {
      console.log(err)
      res.render('register', {
        message: err
      })
    }
    else {
      // registration succeeded.  log user in and load main artist page
      req.login(newUser, (err) => {
        res.redirect('/artists')
      })
    }
  })
})


// GET: /login
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  })
})

module.exports = router;
