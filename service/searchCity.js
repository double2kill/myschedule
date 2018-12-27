const axios = require('axios')

const url = 'http://toy1.weather.com.cn/search'

module.exports = async cityname => {
  const { data } = await axios.get(url, {
    params: {
      cityname
    }
  })
  let result = JSON.parse(data.substring(1, data.length-1))
  return result.map(item => item.ref)
}