var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require('./routes.js');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, 'public')))

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// route
app.use('/', routes);

const FitbitApiClient = require("fitbit-node");
const client = new FitbitApiClient({
    clientId: "22DJKT",
    clientSecret: "035c49af103fcf40103a5191b88a3381",
    apiVersion: '1.2' // 1.2 is the default
});

io.on('connection', function(socket){
    socket.on('getData', function(){
      io.emit('data', 'This is data');
    });
});

http.listen(8080, function(){
    console.log("server started at port 8080...");
});