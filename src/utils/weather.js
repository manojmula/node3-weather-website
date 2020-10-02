const request = require('request')

const weather = (lat,lon,callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=819f961e2b5e69547f86928c9c8132f3&query='+lat+','+lon+'&units=m';

    request({url, json:true},(error, {body})=>
    {
        if(error)
        {
            callback('Sorry , Unable to connect to service!',undefined)
        }
        else if(body.error)
        {
            //callback('Sorry,Unable to find location', undefined)
            callback(body.error,undefined)
        }
        else
        {
            callback(undefined, 
                {
                    description : body.current.weather_descriptions[0],
                    temperature : body.current.temperature,
                    precipitation : body.current.precip,
                    feels_like_temperature : body.current.feelslike,
                    location : body.location.name
                })
        }
    })
}

module.exports = weather