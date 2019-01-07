const process = require('process')
const { exec } = require('child_process')
const handler = require('./handler')

if(process.argv[2]) {
  const stdout = '19:56:16 up 9 days,  8:40,  1 user,  load average: 0.01, 0.06, 0.08'
  handler(null, stdout)
}else {
  exec('uptime', handler)
}