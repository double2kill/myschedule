const model = require('../../model/index')
const moment = require('moment')

const getWeatherJobs = () => model.weatherJobs.find().select('users cityName')

const getTodayWeather = async (weatherJob) => {
  const { cityName } = weatherJob
  const date = moment().format('YYYY-MM-DD')
  return await model.weather.findOne({city:cityName, date})
}

module.exports = {
  getTodayWeather,
  getWeatherJobs
}