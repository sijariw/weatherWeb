const request = require('request')
const forecast = (long, lat, callback) => {
    const weatherStackURL = 'http://api.weatherstack.com/current?access_key=94f6a3e081670405ac3c4f414e5488f3&query=' + long + ',' + lat + '&units=f'
    request({ url: weatherStackURL, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Error Encountered: Unable to Connect to Weather Service', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                weatherDescrip: body.current.weather_descriptions[0],
                currently: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}
module.exports = forecast