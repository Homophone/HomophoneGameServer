const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const app = express()

// Middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ 'extended': false }))
app.use(bodyParser.json())
app.use(cors()) // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests

// Security Middleware
app.use(helmet())
app.use(helmet.noCache())

// rate limiter
const apiLimiter = new rateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 500,
  delayMs: 0 // disabled
})

// API
app.use('/api', apiLimiter, require('./api'))

// Create server. TODO: Is this needed? Heroku maybe?
require('http').createServer()

// Listen
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log('Listening intently on port ', app.get('port'))
  /* eslint-enable no-console */
})

module.exports = app
