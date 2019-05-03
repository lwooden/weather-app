const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibHdvb2RlbiIsImEiOiJjanVvb2FqaHkzNWFiNDNwanpmaHlnbTRsIn0.lIvqHUUgLDEqMOBuLBtq5Q&limit=1'

    request({url, json: true}, (error, { body }) => { // destructure the "response" object to directly access the body property

        // error handling
        if(error) {   // low level error (e.g. wifi disabled, network error)
            callback("Unable to connect to geocode service!", undefined)
          } else if (body.features.length === 0) { // high level error (e.g. HTTP 400 Response)
            callback("Unable to find location!", undefined)
          } else { 
            callback(undefined, { // this is an object
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = {
  geocode
}