var schedule = require('node-schedule');
const logger = require('./logger')
const weather = require('./jobs/weather')

function scheduleCronstyle() {
    schedule.scheduleJob('0 0 9 * * *', function () {
        weather()
    });
}

scheduleCronstyle();