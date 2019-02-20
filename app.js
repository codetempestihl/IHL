var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();

/*
var logger = function(req, res, next){
    console.log("logging...");
    next();
}
app.use(logger);
*/

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, 'public')))

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// route
app.get('/', function(req, res){
    res.render('index',{
        title: 'world'
    });
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8000, function(){
    console.log("server started at port 8000...");
})