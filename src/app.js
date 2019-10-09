const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

// Define paths for Express config
const publicDirname = path.join(__dirname, '../public')
const viewsDirname = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirname)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirname))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Richard'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Richard'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Richard',
    message: 'If you need help with the weather app then please do not hesitate to get in touch.'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }

    weather(latitude, longitude, (error, {forecast}) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        location,
        forecast,
        address: req.query.address
      })
    })
  })

})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term!'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help 404',
    name: 'Richard',
    message: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 ',
    name: 'Richard',
    message: 'Page not found.'
  })
})

app.listen(3999, () => {
  console.log('Server is up and running on port 3999.')
})
