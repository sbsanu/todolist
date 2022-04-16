const express = require("express");
const bodyParser = require("body-parser");


const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", function(req, res){
    let today = new Date();
   let options = {
       weekday: "long",
       day: "numeric",
       month: "long"
   };

   var day = today.toLocaleDateString("en-us", options);
    

   
    res.render("list", {
        listTitle: day,
        newListItems: items
    });
});

app.post("/", function(req,res){
    var item = req.body.newItem;

    items.push(item);
    res.redirect("/");

});
app.get("/work", function(req,res){
    res.render("list", {listTitle:"work list", newListItems: workItems});
});

app.post("/work", function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "work"){
        workItems.push(item);
      
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

   
   
   
});

app.listen(4000, function(){
    console.log("Server started at this port");
});