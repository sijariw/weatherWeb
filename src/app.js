const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
//nodemon app.js -e js,hbs
//here
const app = express()

//Path Definition
const publicJoin = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//HBS engine and views loc setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(publicJoin))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'WeatherApp',
        name: 'My Name'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'My Name'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Do You Need Help',
        help1: 'If you need help with faloxing the gargato press 1',
        help2: 'If you need help with Untangling the third slite string on the azimater press 2',
        help3: 'If you need help with reaching Cerulian press 3',
        help3: 'For any other concern press 4',
        name: 'My Name'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address not provided"
        })
    }
    geocode(req.query.address, (error, { long, lat, loc } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(long, lat, (forecastError, { weatherDescrip,feelsLike,currently }) => {
            if (forecastError) {
                return res.send({
                    error_msg: forecastError
                })
            }
            res.send({
                weatherIn: {
                    location: loc,
                    forecast: weatherDescrip,
                    current: currently,
                    feelsLike: feelsLike
                }
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help Sub page',
        errorMessage: 'Help Page Not Found',
        name: 'My Name'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        errorMessage: '404 Page not found',
        name: 'My Name'
    })
})

app.listen(3000, () => {
    console.log('Server is up')
})