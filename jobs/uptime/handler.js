// const process = require('process')
const handler = require('./check')
const { sendEmail } = require('../../service/email')
const { users, content, subject } = require('./config')
const moment = require('moment')

// process.exec('uptime | cut -f3-5 -d ","', (error, stdout) => {
module.exports = (error, stdout) => {
  if(error) {
    console.log(error)
    return
  }
  const {overload, value} = handler(error, stdout)
  console.log(moment().format() + stdout)
  if(overload===false){
    const txt = content.replace('{value}', value)
    sendEmail(users, txt,subject)
  }
}
