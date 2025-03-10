const model = require('../../model/index')
const moment = require('moment')

const getWeatherJobs = () => model.weatherJobs.find().select('users cityName cityId remark')

const getTodayWeather = async (weatherJob) => {
  const { cityName } = weatherJob
  const date = moment().format('YYYY-MM-DD')
  return await model.weather.findOne({ city: cityName, date })
}

/**
 * 添加一个新的天气任务
 * @param {String} cityName - 城市名称
 * @param {String} cityId - 城市ID
 * @param {Array<String>} users - 用户邮箱列表
 * @param {String} remark - 备注信息
 * @returns {Promise<Object>} 创建的天气任务对象
 */
const addWeatherJob = async (cityName, cityId, users, remark = '') => {
  return await model.weatherJobs.create({
    cityName,
    cityId,
    users,
    remark,
  })
}

/**
 * 根据城市名称更新天气任务
 * @param {String} cityName - 城市名称
 * @param {Object} updateData - 要更新的数据
 * @param {String} [updateData.cityId] - 城市ID
 * @param {Array<String>} [updateData.users] - 用户邮箱列表
 * @param {String} [updateData.remark] - 备注信息
 * @returns {Promise<Object>} 更新结果
 */
const updateWeatherJobByCityName = async (cityName, updateData) => {
  return await model.weatherJobs.findOneAndUpdate(
    { cityName },
    { $set: updateData },
    { new: true, useFindAndModify: false }
  )
}

module.exports = {
  getTodayWeather,
  getWeatherJobs,
  addWeatherJob,
  updateWeatherJobByCityName,
}
