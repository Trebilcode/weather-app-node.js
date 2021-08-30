const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b895974cba2f6db336b0eb0fc8d4d9cf&query=${latitude},${longitude}`

    request({url, json: true}, (err, res, {error, current, location}) => {
        if (err) {
            callback('Unable to connect to weather service!')
        }else if(error) {
            callback(error.info)
        } else {
            callback(null, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees. It feels like ${current.feelslike} degrees out. The observation time was ${current.observation_time}`)
            // callback(null, {
            //     current,
            //     location
            // })
        }
    })
}

module.exports = forecast