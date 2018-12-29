// const process = require('process')
const handler = require('./handler')
const { sendEmail } = require('../../service/email')
const { users, content, subject } = require('./config')

// process.exec('uptime | cut -f3-5 -d ","', (error, stdout) => {
module.exports = (error, stdout) => {
  const {overload, value} = handler(error, stdout)
  if(overload===false){
    const txt = content.replace('{value}', value)
    sendEmail(users, txt,subject)
  }
}