const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 // to get the port provided by heroku..

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

// Setup handlebars engineand views location
app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gopz'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        res.send("You must provide an address")//It ends after one res.send
    }
    
    geocode(req.query.address, (error, {latitude,longitude,location}) => {
        if(error){
            return res.send({error})
        }  
        forecast(latitude, longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/product',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Gopz'
    })
})

app.get('/help', (rep,res) => {
    res.render('help',{
        title: "Help Page!",
        helptext: 'The help page will be updated soon!',
        name: 'Gopz'
    })
})

app.get("/help/*", (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Gopz',
        errormessage: "Help article not found!"
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Gopz',
        errormessage: "My 404 page!"
    })
})
app.listen(port, () => {
    console.log("The server is up running on port "+ port)
})