const express= require('express')
const path = require('path')
const hbs= require('hbs')
const geocode= require('./utils/geocode.js')
const forecast= require('./utils/forecast')

const app = express()

app.set('view engine','hbs')

const publicDir= path.join(__dirname,'../public')
const viewsDir= path.join(__dirname,'../templates/views')
const partialsDir= path.join(__dirname,'../templates/partials')

app.use(express.static(publicDir))
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)


app.get('/',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Pradeep Selva"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About creator",
        name: "Pradeep Selva"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        msg: "Use this app to find the weather forecast of any required location!",
        name:"Pradeep Selva"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('errorPg',{
        title:"404",
        error: "Help article not found!",
        name:"Pradeep Selva"
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:"please enter a search field to continue!"
        })
    }

    geocode(req.query.search,(error,{lat,long,place}={})=>{
        if(error){
            return res.send({error})
        }
        
    
        forecast(lat,long, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            
 
            res.send({
                forecast: forecastData,
                location: place
            })
        })  
    })
   
})



app.get('*',(req,res)=>{
    res.render('errorPg',{
        title: "404",
        error: "Page not found!",
        name:"Pradeep Selva"
    })
})



app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})