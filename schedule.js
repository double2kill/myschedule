var schedule = require('node-schedule');
const logger = require('./logger');
const weather = require('./jobs/weather');

const scheduleCronstyle = () => {
    schedule.scheduleJob('0 0 9 * * *', () => {
        logger.info('start get weather')
        // 这个函数不可以写async,因为超过30s处理时间会抛出错误
        weather()
            .then(data => {
                logger.info('end')
            })
    });
}

scheduleCronstyle();