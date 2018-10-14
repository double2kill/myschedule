var schedule = require('node-schedule');
const logger = require('./logger')

function scheduleCronstyle() {
    schedule.scheduleJob('30 * * * * *', function () {
        logger.info('Hello again distributed logs');
    });
}

scheduleCronstyle();