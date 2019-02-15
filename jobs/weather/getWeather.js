const puppeteer = require('puppeteer')
const searchCity = require('../../service/searchCity')

module.exports = async (cityName) => {
  const cityInfo = await searchCity(cityName)
  const cityId = cityInfo[0].split('~')[0]
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  })
  const page = await browser.newPage()
  try {
    // 可能会出现超时失败
    await page.goto(`http://www.weather.com.cn/weather/${cityId}.shtml`, {
      // 120s
      timeout: 120000
    })
  } catch (error) {
    await browser.close()
    console.error(error)
    throw error
  }

  const dimensions = await page.evaluate(() => {

    const isValid = (value) => {
      return value !== undefined && value !== null && value !== 'null'
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
      .filter(item => isValid(item.hour) && isValid(item.temp) && isValid(item.prec))
      .reduce((result, {
        temp,
        prec
      }, index) => {
        return {
          max_temp: Math.max(+temp, result.max_temp),
          min_temp: Math.min(+temp, result.min_temp),
          total_prec: index === 0
            ? result.total_prec
            : +(result.total_prec + +prec).toFixed(2)
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