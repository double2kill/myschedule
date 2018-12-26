const { users } = require('./config')
const getWeather = require('./getWeather')

const main = async (isTest) => {
  console.log(isTest)
  const {city, data, text, statistics} = await getWeather()

  if(!isTest) {
    const { weather: Model_weather } = require('../../model')
    const moment = require('moment')
    const sendEmail = require('./sendEmail')

    const date = moment().format('MM-DD')
    await Model_weather.create({
      date,
      text,
      city,
      data,
      statistics,
      users
    })
    
    await sendEmail(users, text)
  } else {
    console.log({city, data, text, statistics})
  }
}

module.exports = main
