var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require('./routes.js');
var session=require('express-session')({secret:'key',saveUninitialized:false ,resave:true});
var sharedsession = require("express-socket.io-session");
var client = require('./fitbit.js')
var User = require('./user.js')

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
            refresh_token = user[0].fitbit.refresh_token;

            var data = {}
            client.get('/devices.json', access_token).then(results => {
                data['deviceName'] = results[0][0]['deviceVersion'];
                client.get('/sleep/date/today.json', access_token).then(results => {
                    data['sleep'] = results[0]['summary']['totalMinutesAsleep'];
                    data['sleepLog'] = []
                    results[0]['sleep'].forEach(element => {
                        data['sleepLog'].push({startTime: element['startTime'], endTime:element['endTime']})
                    });
                    client.get('/profile.json', access_token).then(results => {
                        data['weight'] = results[0]['user']['weight']
                        client.get('/activities/date/today.json', access_token).then(results => {
                            data['steps'] = results[0]['summary']['steps'];
                            data['distance'] = results[0]['summary']['distance'];
                            data['calories'] = results[0]['summary']['calories']['total'];
                            io.emit('data', data);
                        }).catch(err => {
                            data['err'] = err
                            io.emit('data', data);
                        });
                    }).catch(err => {
                        data['err'] = err
                        io.emit('data', data);
                    });
                }).catch(err => {
                    data['err'] = err
                    io.emit('data', data);
                })
            }).catch(err => {
                console.log(err)
                client.refreshAccessToken(access_token, refresh_token).then(result => {
                    socket.handshake.session.user[0].fitbit.access_token = result.access_token
                    socket.handshake.session.user[0].fitbit.refresh_token = result.refresh_token
                    socket.handshake.session.save()

                    User.updateOne({email: user[0].email},{$set:{fitbit: {access_token: result.access_token, refresh_token: result.refresh_token}}},{ upsert: true },function(err){});
                    console.log("Refreshed")
                }).catch(err => {
                    // console.log(err)
                });
                data['err'] = err
                io.emit('data', data);
            })
        }
    });
});

http.listen(8080, function(){
    console.log("server started at port 8080...");
});