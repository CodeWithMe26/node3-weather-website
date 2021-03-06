const request = require('request')

const forecast = (latitude,longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d78a049bb4c5f667661357b5848d0cbe&query='+latitude+','+longitude + '&units=f'
    request({url ,json : true},(error,{ body }) => {
        if(error){
            callback('Unable to connect to weather services !',undefined)

        } else if(body.error){
            callback('Unable to find location',undefined)

        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature +
                ' degrees farhenheit out . It feels like ' + body.current.feelslike + ' degrees farhenheit . The humidity is '
                + body.current.humidity + '%.')

        }
    })  

}

module.exports = forecast