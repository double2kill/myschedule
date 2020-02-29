const puppeteer = require('puppeteer')
const searchCity = require('../../service/searchCity')
const log4js = require('log4js')
const logger = log4js.getLogger('getWeather')
logger.level = 'info'

module.exports = async (cityName) => {
  const cityInfo = await searchCity(cityName)
  const cityId = cityInfo[0].split('~')[0]
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    ignoreDefaultArgs: ['--enable-automation']
  })
  const page = (await browser.pages())[0]
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    })
  })
  try {
    const url = `http://www.weather.com.cn/weather/${cityId}.shtml`
    logger.info(url)
    // 可能会出现超时失败
    await page.goto(url)
  } catch (error) {
    logger.error(error)
    await page.screenshot({path: 'error.png'})
    await browser.close()
  }

  const dimensions = await page.evaluate(() => {

    const isValid = (value) => {
      return value !== undefined && value !== null && value !== 'null' && value !== ''
    }

    const {
      od1: city,
      od2
    } = window.observe24h_data.od
    const data = od2
      .map(item => ({
        hour: item.od21,
        temp: item.od22,
        prec: item.od26
      }))

    const statistics = data
      .filter(item => isValid(item.hour) && isValid(item.temp))
      .reduce((result, {
        temp,
        prec,
      }, index) => {
        let correctPrec = prec
        if (!isValid(prec)) {
          correctPrec = 0
        }
        return {
          max_temp: Math.max(+temp, result.max_temp),
          min_temp: Math.min(+temp, result.min_temp),
          total_prec: index === 0
            ? result.total_prec
            : +(result.total_prec + +correctPrec).toFixed(2),
        }
      }, {
        max_temp: -Infinity,
        min_temp: Infinity,
        total_prec: 0,
      })
      

    return {
      od2,
      city,
      data,
      statistics
    }
  })

  // await browser.close()
  // 异步关闭浏览器
  browser.close()

  const { statistics } = dimensions
  logger.info(statistics)

  const text = `
  最高温: ${statistics.max_temp}℃
  最低温: ${statistics.min_temp}℃
  降水量: ${statistics.total_prec}mm
  `

  return {
    ...dimensions,
    text
  }
}