const assert = require('assert')
const getWeather = require('../jobs/weather/getWeather')
const searchCity = require('../service/searchCity')

describe('jobs', function() {
  describe('weather', function() {
    it.only('getWeather成功返回指定的字段', async () => {
      const data = await getWeather('大田')
      const keys = Object.keys(data)
      assert.deepStrictEqual(keys, ['od2','city','data','statistics','text'])
    })
  })
})

describe('service', function() {
  describe('searchCity', function() {
    it.only('搜索大田信息结果返回正确', async () => {
      // 设置输入
      const city = '大田'
      // 运行
      const [first] = await searchCity(city)
      // 验证输出
      assert.equal(first, '101230811~fujian~大田~Datian~大田~Datian~598~366100~DT~福建')
    })
  })
})