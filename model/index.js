const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(config.mongoose.url, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('db connected')
})

module.exports = {
  weather: require('./weather')(mongoose),
  weatherJobs: require('./weatherJobs')(mongoose),
  db
}