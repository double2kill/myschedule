// const process = require('process')
const check = require('./check')
const { sendEmail } = require('../../service/email')
const { users, content, subject } = require('./config')
const moment = require('moment')

module.exports = (error, stdout) => {
  if(error) {
    console.log(error)
    return
  }
  const {overload, value} = check(error, stdout)
  console.log(moment().format() + ' ' + stdout)
  if(overload){
    const txt = content.replace('{value}', value)
    sendEmail(users, txt,subject)
  }
}
