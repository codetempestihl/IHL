var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require('./routes.js');
//var settings=require('./setting.js');
// var $ = require('jquery');
var session=require('express-session')({secret:'key',saveUninitialized:false ,resave:true});
var sharedsession = require("express-socket.io-session");
var client = require('./fitbit.js')
var User = require('./schema.js')

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
//app.use('/settings',settings);

io.on('connection', function(socket){
    socket.on('getFitbitFastData', function(){
        fitbit = socket.handshake.session.fitbit
        if(socket.handshake.session.fitbit){
            access_token = fitbit.access_token;
            refresh_token = fitbit.refresh_token;
            var data = {}
            client.get('/activities/date/today.json', access_token).then(results => {
                data['goalSteps'] = results[0]['goals']['steps'];
                data['goalDistance'] = results[0]['goals']['distance'];
                data['goalCalories'] = results[0]['goals']['calories'];

                data['steps'] = results[0]['summary']['steps'];
                data['distance'] = results[0]['summary']['distance'];
                data['calories'] = results[0]['summary']['calories']['total'];
                io.emit('fitbitFastData', data)
            }).catch(err => {
                data['err'] = err
                io.emit('data', data);
            });
        }
    });
    socket.on('getFitbitSlowData', function(){

        fitbit = socket.handshake.session.fitbit
        if(socket.handshake.session.fitbit){
            access_token = fitbit.access_token;
            refresh_token = fitbit.refresh_token;
            var data = {}

            var date = new Date() 
            var endDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
            
            date.setDate(date.getDate() - 7)
            var startDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)

            var deviceRequest = client.get('/devices.json', access_token).then(results => {
                                    data['deviceName'] = results[0][0]['deviceVersion'];
                                }).catch(err => {
                                    data['err'] = err
                                })

            var sleepRequest  = client.get('/sleep/date/' + startDate + '/' + endDate + '.json', access_token).then(results => {
                                    data['sleep'] = results[0]['sleep']
                                }).catch(err => {
                                    data['err'] = err
                                })
            
            var profileRequest =    client.get('/profile.json', access_token).then(results => {
                                        data['weight'] = results[0]['user']['weight']
                                    }).catch(err => {
                                        data['err'] = err
                                    })
            
            var recentActivityRequest = client.get('/activities/recent.json', access_token).then(results => {
                                            data['recentActivities'] = [];
                                            results[0].forEach(element => {
                                                data['recentActivities'].push({name: element['name'], duration:element['duration']})
                                            });
                                        }).catch(err => {
                                            data['err'] = err
                                        })
            
            var pastSleepRequest =  client.get('/activities/steps/date/today/7d.json', access_token).then(results => {
                                        data['pastSteps'] = results[0]['activities-steps'];
                                    }).catch(err => {
                                        data['err'] = err
                                    })
                                
            var pastDistanceRequest =  client.get('/activities/distance/date/today/7d.json', access_token).then(results => {
                                        data['pastDistance'] = results[0]['activities-distance'];
                                    }).catch(err => {
                                        data['err'] = err
                                    })

            var pastCaloriesRequest =  client.get('/activities/calories/date/today/7d.json', access_token).then(results => {
                                        data['pastCalories'] = results[0]['activities-calories'];
                                    }).catch(err => {
                                        data['err'] = err
                                    })
                
            Promise.all([deviceRequest, sleepRequest, profileRequest, recentActivityRequest, pastSleepRequest, pastCaloriesRequest, pastDistanceRequest]).then(result => {
                io.emit('fitbitSlowData', data)
            })

            // client.refreshAccessToken(access_token, refresh_token).then(result => {
            //     socket.handshake.session.user[0].fitbit.access_token = result.access_token
            //     socket.handshake.session.user[0].fitbit.refresh_token = result.refresh_token
            //     socket.handshake.session.save()

            //     User.updateOne({email: user[0].email},{$set:{fitbit: {access_token: result.access_token, refresh_token: result.refresh_token}}},{ upsert: true },function(err){});
            // })

        }
    });
});

http.listen(8080, function(){
    console.log("server started at port 8080...");
})
