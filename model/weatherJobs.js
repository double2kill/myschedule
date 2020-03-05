module.exports = (mongoose) => {
  var schema = new mongoose.Schema({
    remark: String,
    cityName: String,
    users: [ String ],
  })
  return mongoose.model('WeatherJob', schema)
}