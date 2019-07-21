const express = require('express')
const router = express()
const City = require('../model/City')
const request = require('request')
const moment = require('moment')


router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    //if err return null
    request(`https://api.apixu.com/v1/forecast.json?key=f55bc5814fa74f2b874134414191707&q=${cityName}`,
        function (error, response, body) {
            console.log(response);
           console.log(error)
            if(response.statusCode !== 200) {
                return  res.send("error")
            }
            const jsonBody = JSON.parse(body || "{}")
            const city = {
                name: jsonBody.location.region,
                updatedAt: jsonBody.current.last_updated,
                temperature: jsonBody.current.temp_c,
                condition: jsonBody.current.condition.text,
                conditionPic: jsonBody.current.condition.icon,
                isSaved: false,
                isLoading: true,
            }
            res.send(city)
        })
})

router.get('/cities', async function (req, res) {
    let data = await City.find({})
    res.send(data)
})

router.post('/city', function (req, res) {
    let city = req.body
    city.isSaved = true;
    let newCity = new City(city)
    newCity.save()
    res.send(newCity)
})

router.delete('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    City.findOne({ name: cityName }, function (err, city) {
        city.remove(function (err) {
            console.log(err)
            res.send(city)
        })
    })
})

module.exports = router 