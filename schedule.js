var schedule = require('node-schedule')
const logger = require('./logger')
const weather = require('./jobs/weather')

const scheduleCronstyle = (isTest) => {
  console.log('start program')
  if(isTest) {
    weather(isTest)
  } else {
    schedule.scheduleJob('0 40 8 * * *', () => {
      logger.info('start get weather')
      // 这个函数不可以写async,因为超过30s处理时间会抛出错误
      weather()
        .then(() => {
          logger.info('end')
        })
    })
  }
}

scheduleCronstyle()
