const model = require('../../model/index')

module.exports = () => model.weatherJobs.find().select('users cityName')