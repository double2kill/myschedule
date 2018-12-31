const process = require('process')
const { cityName, users } = require('./config')
const getWeather = require('./getWeather')

const main = async (isTest) => {
  console.log(isTest)
  const {city, data, text, statistics} = await getWeather(cityName)

  if(!isTest) {
    const { weather: Model_weather, db } = require('../../model')
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
    await db.close()

    await sendEmail(users, text)
  } else {
    console.log({city, data, text, statistics})
  }
  return {city, data, text, statistics}
}

if(process.argv[2]) {
  main(true)
} else {
  main()
}