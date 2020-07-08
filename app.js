const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static(__dirname + "/css"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

let todoList = ["nothing", "Hous"];

app.get("/", function(req, res){    
    let date = new Date();
    
    let options = {
        weekday: "long",
        day:     "numeric",
        month:   "long"
    }
    
    let today = date.toLocaleDateString("pt-BR", options);
    
    let url = "https://api.openweathermap.org/data/2.5/weather?q=Belo Horizonte&appid=6d6655785eff82bcb5b9dc7d71df6229&units=metric";
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData.weather[0].icon)
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.render("list", {listElement: todoList, day: today, weather: weatherData, icon: imageURL});
        });
    });
    
});

app.post("/", function(req, res){
    let newItem = req.body.newItem;
    if(newItem != ""){
        todoList.push(newItem);
    }

    res.redirect("/");
});

app.post("/forecast", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT, function(){
    console.log("Server is running.");
});