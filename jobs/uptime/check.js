const { overloadValue } = require('./config')
const R = require('ramda')

const getLoadValue = R.pipe(
  R.split('load average:'),
  R.last,
  R.split(','),
  R.path(['1']),
  R.trim()
)


module.exports = function (error, stdout) {
  if (error !== null) {
    console.log('exec error: ' + error)
    return
  }
  const value = getLoadValue(stdout)
  const overload = +value > overloadValue
  return {
    value,
    overload
  }
}