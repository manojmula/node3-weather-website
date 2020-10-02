const request = require('request')


const geocode = (address,callback) =>
{
 const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFub2ptdWxha2FsYSIsImEiOiJja2Zub2s1azMybnFlMnlvM2tvNnE4bXFlIn0.Oxhl0QcArixAwHrrNp69fQ&limit=1';   

 request({url : url,json:true},(error, {body})=>
 {
     if(error)
     {
         callback('Unable to connect to location service',undefined);
     }
     else if(body.features.length === 0)
     {
         callback('Unable to find location.Please,try another search', undefined)
     }
     else
     {
         callback(undefined,{
            latitude : body.features[0].geometry.coordinates[1],
              longitude   : body.features[0].geometry.coordinates[0],
             place : body.features[0].place_name
         })
         
     }
     
 })
}

module.exports = geocode