const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(path.join(__dirname,"../public"))
const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('' , (req,res) => {
    res.render('index' , {
        title: 'Weather',
        name: 'Ayush'
    })

})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Ayush'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        help: 'I am here to help you',
        title: 'help',
        name: 'Ayush'
    })
})

app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })

    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude,longitude ,(error,forecastData)=>{
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
    // res.send({forecast: 37.9,
    //     location: 'philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=> {
    if(!req.query.search){
        return res.send({
            error: 'Provide search term'
        })

    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Ayush',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: 404,
        name: 'Ayush',
        errorMessage: 'page not found'
    })

})

app.listen(port,() => {
    console.log("Server is up and running on " +port)
})