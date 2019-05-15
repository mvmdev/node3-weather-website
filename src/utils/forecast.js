const request=require('request')
const forecast=(latitude,longitude,callback)=>
 {
   const url='https://api.darksky.net/forecast/cb0a6c3402d46362c2f2aebc319d7259/'+latitude+','+longitude+'?units=si'
 
    request({url:url,json:true},(error,response)=>
     {
         if(error)
         {
             callback('Unable to connect to weather service!',undefined)
         }
         else if(response.body.error)
         {
            callback('Unable to find location, coordinates maybe not correct',undefined)
         }
         else
         {
             callback(undefined,response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+' degrees out. '+'The high today is '+response.body.daily.data[0].temperatureHigh+'with a low of '+response.body.daily.data[0].temperatureLow+'. There is '+response.body.currently.precipProbability+' % chance of rain')
         }
     })
}
module.exports=forecast