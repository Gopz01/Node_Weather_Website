const request = require("request")
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiZ29wenoiLCJhIjoiY2ttY2U3MzN2MXl0ZjJ2bXpjZHhyZ2JxNCJ9.0kv6URKeXmqwC1-_4d1tWQ&limit=1&center"
    request({url, json: true},(error, {body} = {}) => {
        if(error){
            callback("Unable to connect to the weather service!", undefined)
        }else if(body.error){
            callback("Unable to find the location. Try again!", undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude:body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode
