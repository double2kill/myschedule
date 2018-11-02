module.exports = (mongoose) => {
  var schema = new mongoose.Schema({
    text: String,
    date: String,
    city: String,
    data: [],
    statistics: {},
    users: [],
    create_time: { type: Date, default: Date.now }
  })
  return mongoose.model('weather', schema);
}