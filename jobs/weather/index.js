const process = require('process')
const getWeatherJobs = require('./getWeatherJobs')
const getWeather = require('./getWeather')
const log4js = require('log4js')
const logger = log4js.getLogger('index')
const { weather: Model_weather, db } = require('../../model')
logger.level = 'info'

const getWeatherFromOneJob = async (weatherJob, isTest) => {
  const { cityName, users } = weatherJob
  const {city, data, text, statistics} = await getWeather(cityName)

  if(!isTest) {
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

    await sendEmail(users, text, city)
  } else {
    logger.info({city, data, text, statistics})
  }
  return
}

const main = async (isTest) => {
  logger.info(`isTest: ${!!isTest}`)
  const weatherJobs = await getWeatherJobs()
  for(let weatherJob of weatherJobs ) {
    try {
      await getWeatherFromOneJob(weatherJob, isTest)
    } catch (error) {
      logger.error(error)
    }
  }
  await db.close()
}

if(process.argv[2]) {
  main(true)
} else {
  main()
}