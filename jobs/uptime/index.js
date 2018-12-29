const process = require('process')
const { exec } = require('child_process')
const handler = require('./handler')

if(process.argv[2]) {
  const stdout = '  load average: 5, 0.06, 0.06'
  handler(null, stdout)
}else {
  exec('uptime | cut -f3-5 -d ","', handler)
}