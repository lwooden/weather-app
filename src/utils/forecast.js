const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5e5fcd74aa78114f22b666d82fd04723/' + latitude + ',' + longitude

    request({url, json: true}, (error, { body }) => { // destructure the "response" object to directly access the body property
    
        // error handling
        if(error) {   // low level error (e.g. wifi disabled, network error)
            callback("Unable to connect to weather service!", undefined)
          } else if (body.error) { // high level error (e.g. HTTP 400 Response)
            callback("Unable to find location!", undefined)
          } else {
              callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees outside. There is a " + body.currently.precipProbability + "% chance of rain!")
          }
    })
}

module.exports = {
    forecast
}


// Geocode Service - Grab Lat + Long of a particular location to feed into Darksky URL
// Address -> Lat/Long -> Weather