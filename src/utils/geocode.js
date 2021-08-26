const request = require('request')

const geoCode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXl1c2gyNiIsImEiOiJja3NlMnUwM2UwZjE1Mnd0YnBibThweGRvIn0.mQ5kP4C3kaSSlWbgi0xzPQ&limit=1'
    request({url ,json: true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services !',undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location, Try another location',undefined)
        } else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name  
            })
        }

    })

}

module.exports = geoCode