const jsdom = require('jsdom')
const { JSDOM } = jsdom

const log4js = require('log4js')
const logger = log4js.getLogger('getWeather')
logger.level = 'info'

module.exports = async (cityName, cityId) => {
  const city = cityName
  const virtualConsole = new jsdom.VirtualConsole()

  const dom = await JSDOM.fromURL(`http://www.weather.com.cn/weather/${cityId}.shtml`, {
    runScripts: 'dangerously',
    virtualConsole
  })


  const {
    od2
  } = dom.window.observe24h_data.od
  const data = od2
    .slice(0, -1)
    .map(item => ({
      hour: item.od21,
      temp: item.od22,
      prec: item.od26
    }))

  const statistics = data.reduce((result, {
    temp,
    prec
  }) => {
    return {
      max_temp: Math.max(temp, result.max_temp),
      min_temp: Math.min(temp, result.min_temp),
      total_prec: +(result.total_prec + +prec).toFixed(2)
    }
  }, {
    max_temp: -Infinity,
    min_temp: Infinity,
    total_prec: 0,
  })


  logger.info(statistics)

  const text = `
  最高温: ${statistics.max_temp}℃
  最低温: ${statistics.min_temp}℃
  降水量: ${statistics.total_prec}mm
  `

  return {
    od2,
    city,
    data,
    statistics,
    text
  }
}
