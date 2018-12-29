const config = require('../../config')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secureConnection: true, // 使用了 SSL
  auth: config.auth
})

module.exports = transporter