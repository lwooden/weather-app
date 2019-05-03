
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express to make publicly accessible for web server
const pathToPublic = path.join(__dirname,'../public') 
const pathToViews = path.join(__dirname,'../templates/views')
const pathToPartials = path.join(__dirname,'../templates/partials')
console.log(pathToPartials)


app.set('view engine', 'hbs') // configuration to use handlebars
app.set('views', pathToViews) // define path for handlebars to look for views folder
hbs.registerPartials(pathToPartials) // define the path for handlebars to look for partials folder


app.use(express.static(pathToPublic))


app.get('', (req, res) => {
    res.render('index', {
        name: 'Low', // dynamic varibale to display in HTML page
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Low', // dynamic varibale to display in HTML page
        title: 'About' // dynamic varibale to display in HTML page
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Low', // dynamic varibale to display in HTML page
        title: 'Help',
        helpText: 'Welcome to the help page!'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter a address!"
        })
    }
    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        // if the user provides a search term that does not provide a match then the application will crash becuase it cannot destructure a empty object
        // we fix this by giving the function a "default value" of an empty object {}
        if (error) {
            return res.send({ error })
        }
        forecast.forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })


    })

    // res.send({
    //     forecast: '50 Degrees',
    //     location: 'Upper Marlboro, MD',
    //     address: req.query.address // set this value dynamically based on the input provided by the query string
    // })

})

app.get('/products', (req, res) => {

    // if no search term is provided send the error response and exit the program
    if (!req.query.search) {
        return res.send({ 
           error: "Please enter a search value" 
        })
    }

    console.log(req.query) // input provided by the query string (e.g ?key=value or ?search=games&ratings=5)

    res.send({
        products: []
    })

})

// HTTP 404 Routes Are Saved For Last
// Routes are processed from the top of the file to the bottom

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'The help page you are looking for does not exist!',
        name: 'Low'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Low'
    })
})




app.listen(3000, () => {
    console.log('Listening on port 3000')
})