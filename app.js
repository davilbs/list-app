const express = require("express");
const bodyParser = require("body-parser");
// const https = require("https");
const weather = require(__dirname + "/weather.js");
const date = require(__dirname + "/date.js");

const app = express();

app.use(express.static(__dirname + "/css"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

let todoList = ["nothing", "Hous"];

let weatherData = weather();

app.get("/", function(req, res){    
    let today = date();
    if(weatherData.length > 1){
        weatherData[0] = weatherData[1];
        
    }
    let forecast = weatherData[0];
    let icon = forecast.weather[0].icon;
    let imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
    
    res.render("list", {listElement: todoList, day: today, weather: forecast, icon: imageURL});
});

app.post("/", function(req, res){
    let newItem = req.body.newItem;
    if(newItem != ""){
        todoList.push(newItem);
    }

    res.redirect("/");
});

app.post("/forecast", async function(req, res){
    weatherData.push(weather());
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running");
});