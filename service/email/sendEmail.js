const mail = require('./mail')

module.exports = async (users, text, subject='来自刘晨的邮件') => {
  
  let mailOptions = {
    from: '刘晨<379563000@qq.com>',
    // to: '刘晨<379563000@qq.com>',
    subject: subject,
    text: text,
    html: text
  }
  // 发送users的处理
  users
    .map(item => {
      return {
        to: item,
        ...mailOptions
      }
    })
    .map(option => {
      console.log(option)
      // TODO 这里可能会有异步问题，应该要写一个promise
      mail.sendMail(option, (error, info) => {
        if (error) {
          return console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
      })
    })
}