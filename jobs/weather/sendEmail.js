const mail = require('./mail')
const moment = require('moment')

module.exports = async (users, text, city) => {
  
  const date = moment().format('MM-DD')

  let mailOptions = {
    from: '刘晨<379563000@qq.com>',
    // to: '刘晨<379563000@qq.com>',
    subject: `${city} - ${date}天气信息`,
    text: text,
    html: text
  }
  // 发送users的处理
  users.map(item => {
    return {
      to: item,
      ...mailOptions
    }
  }).map(option => {
    // TODO 这里可能会有异步问题，应该要写一个promise
    mail.sendMail(option, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
    })
  })
}