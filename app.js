const express = require("express");
const bodyParser = require("body-parser");

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
    
    console.log("Got /");
    
    res.render("list", {listElement: todoList, day: today});
});

app.post("/", function(req, res){
    let newItem = req.body.newItem;

    todoList.push(newItem);

    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Listening on port 3000.");
});