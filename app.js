var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require('./routes.js');
var session=require('express-session')({secret:'key',saveUninitialized:false ,resave:true});
var sharedsession = require("express-socket.io-session");
var client = require('./fitbit.js')

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(session)
io.use(sharedsession(session))

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

io.on('connection', function(socket){
    socket.on('getData', function(){
        user = socket.handshake.session.user
        if(socket.handshake.session.user){
            access_token = user[0].fitbit.access_token;
            client.get('/profile.json', access_token).then(results => {
                io.emit('data', results[0])
            }).catch(err => {
                io.emit('data', "couldn't fetch")
            });
        }
    });
});

http.listen(8080, function(){
    console.log("server started at port 8080...");
});