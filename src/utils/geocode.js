const request = require('request')
const geoCode = (address, callback) => {
    const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoib3p5bWFuZGl1czgyODIiLCJhIjoiY2txODl0N3ZtMGRzMzJvbjRvd2lydDhuciJ9.WZM7LXPXyVrq0_3crG6xIQ&limit=1'
    request({ url: geoCodeURL, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Error Encountered: Unable to Connect to GeoCode Service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please verify search.', undefined)
        } else {
            callback(undefined, {
                long: body.features[0].center[1],
                lat: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    })
}
module.exports=geoCode