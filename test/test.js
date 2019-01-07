const assert = require('assert')
const getWeather = require('../jobs/weather/getWeather')
const searchCity = require('../service/searchCity')

describe('jobs', function() {
  describe('weather', function() {
    it('getWeather成功返回指定的字段', async () => {
      const data = await getWeather('大田')
      const keys = Object.keys(data)
      assert.deepStrictEqual(keys, ['od2','city','data','statistics','text'])
    })
  })

  describe('uptime', function() {
    const check = require('../jobs/uptime/check')

    it.only('load average: 0.18, 0.06, 0.06结果为false', async () => {
      const stdout = '  load average: 0.18, 0.06, 0.06'

      const { overload } = check(null, stdout)

      assert.equal(overload, false)
    })

    it.only('19:56:16 up 9 days,  8:40,  1 user,  load average: 0.01, 0.06, 0.08结果为false', async () => {
      const stdout = '19:56:16 up 9 days,  8:40,  1 user,  load average: 0.01, 0.06, 0.08'

      const { overload } = check(null, stdout)

      assert.equal(overload, false)
    })

    it.only('load average: 5, 0.06, 0.06结果为true', async () => {
      const stdout = '  load average: 5, 0.06, 0.06'

      const { overload } = check(null, stdout)

      assert.equal(overload, true)
    })

    it('验证发邮件', async () => {
      const stdout = '  load average: 5, 0.06, 0.06'

      const uptime = require('../jobs/uptime')
      uptime(null, stdout)

      // assert.equal(result, false)
    })
  })
})

describe('service', function() {
  describe('searchCity', function() {
    it('搜索大田信息结果返回正确', async () => {
      // 设置输入
      const city = '大田'
      // 运行
      const [first] = await searchCity(city)
      // 验证输出
      assert.equal(first, '101230811~fujian~大田~Datian~大田~Datian~598~366100~DT~福建')
    })
  })
})