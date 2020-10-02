const path = require('path')
const express = require('express')
const hbs =  require('hbs')
//const { request } = require('http')
// const request = require("request")
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'/template/views')
const partialsPath = path.join(__dirname, '/template/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static location to serve
app.use(express.static(publicDirectoryPath))

app.get('/about', (req, res) =>
{
    res.render('about', {
        title:'About',
        name: 'Manoj'
    })
})

app.get('/help',(req, res)=>
{
    res.render('help',{
        title: 'Help',
        message: 'How can i help you?',
        name: 'Manoj'
    })
})

app.get('', (req, res)=>
{
    res.render('index',{
        title: 'Weather',
        name: 'Manoj'
    })
})

app.get('/weather', (req, res)=>
{
    if(!req.query.address)
    {
       return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, place} = {} )=>
    {
        console.log(latitude,longitude,place)
        if(error)
        {
            return res.send({
                error
            });
        }
        
        
        weather(latitude,longitude,(error,forecastData)=>
        {
            if(error)
            {
             return res.send({
                 error
            })
        }

            const discription = "The sky is "+forecastData.description + "." + "It is currently "+ forecastData.temperature+" degress out. There is a "+forecastData.precipitation+"% chance of rain." 

            res.send({
                location : place,
                description : discription
            })
           
        })
        
        
    })
})

app.get('/products', (req, res)=>{

    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide search term'
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res)=>
{
    res.render('404help',{
        title: 'Help',
        name: 'Manoj',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>
{
    res.render('404', {
        title: '404',
        name: 'Manoj',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=>
{
    console.log('Server is up on port 3000')

})

