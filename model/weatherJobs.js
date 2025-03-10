module.exports = (mongoose) => {
  var schema = new mongoose.Schema({
    remark: String,
    cityName: String,
    cityId: String,
    users: [ String ],
  })
  return mongoose.model('WeatherJob', schema)
}