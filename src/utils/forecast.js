const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=39959d6d5930d2bd8a25e8d88e66a132&query="+latitude+","+longitude
    request ({url, json: true},(error, {body} = {}) => {
        if(error){
            callback("Unable to connect to the weather service!", undefined)
        }else if(body.error){
            callback("Unable to find location!", undefined)
        }else{
            callback(undefined, "It is cold. It's currently "+body.current.temperature+" degrees celsius out in "+body.location.name)
        }
    })
}
module.exports = forecast
