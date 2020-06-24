const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + "/css"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

todoList = ["nothing", "Hous"];

app.get("/", function(req, res){
    var date = new Date();

    var options = {
        weekday: "long",
        day:     "numeric",
        month:   "long"
    }

    var today = date.toLocaleDateString("pt-BR", options);
    
    console.log("Got /");
    
    res.render("list", {listElement: todoList, day: today});
});

app.post("/", function(req, res){
    var newItem = req.body.newItem;

    todoList.push(newItem);

    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Listening on port 3000.");
});