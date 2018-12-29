const { overloadValue } = require('./config')
// const string = '  load average: 0.18, 0.06, 0.06'
module.exports = function (error, stdout) {
  if (error !== null) {
    console.log('exec error: ' + error)
    return
  }
  const value = +(stdout.split(' ')[4].split(',')[0])
  const overload = value < overloadValue
  return {
    value,
    overload
  }
}