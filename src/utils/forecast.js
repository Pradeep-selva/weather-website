const request = require('request')

const forecast= (lat,long,callback)=>{
    
    const url = 'https://api.darksky.net/forecast/1045a23452b0731ef03cfaa2c31fc7a8/'+lat+','+long


    request({url: url, json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to the internet!',undefined)
        }
        else if(response.body.error){
            callback('Unable to find the required location!',undefined)
        }
        else{
            callback(undefined,response.body.daily.data[0].summary+" It is currently "+response.body.currently.temperature+" degrees out. There is "+response.body.currently.precipProbability+"% chance of rain")
        }

    })
}

module.exports=forecast