const request = require('request')

const weather = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/98c754db053ab156e1238315df07dffa/' + latitude + ',' + longitude + '?units=uk2'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, {
        forecast: body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees celcius out. There is a ' + (body.currently.precipProbability*100) + '% chance of rain. The maximum temperature will be ' + body.daily.data[0].temperatureHigh + ' and the minimum temperature will be ' + body.daily.data[0].temperatureLow + '.'
      })
    }
  })
}

module.exports = weather
