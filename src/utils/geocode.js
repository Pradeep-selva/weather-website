const request= require('request')

const geocode= (address,callback)=>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhZGVlcHNlbHZhIiwiYSI6ImNrM2VpZGQwNDBrazUzZG83MmJibjVsN2QifQ.YDep-Z4VRwXeXuzT-kbaxw&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to the internet!',undefined)
        }
        else if(response.body.features.length ===0){
            callback('Unable to find the required location!',undefined)

        }
        else{

            const data={
                lat:response.body.features[0].center[1],
                long:response.body.features[0].center[0],
                place:response.body.features[0].place_name
            }
           

            callback(undefined,data)
        }
        
    } )
}

module.exports= geocode