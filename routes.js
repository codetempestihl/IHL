var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
	res.render('index');
})

router.post('/', function(req, res){
    console.log(req.body);
    // hanlde signup and login process
})

router.get('/home', function(req, res){
    res.render('home');
})

var refreshToken, accessToken;

router.get('/test', function(req, res){
    res.render('test');
})

const FitbitApiClient = require("fitbit-node");
const client = new FitbitApiClient({
    clientId: "22DJKT",
    clientSecret: "035c49af103fcf40103a5191b88a3381",
    apiVersion: '1.2' // 1.2 is the default
});

router.get('/fitbit', function(req, res){
	res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:8080/callback'));
})

// handle the callback from the Fitbit authorization flow
router.get("/callback", (req, res) => {
	// exchange the authorization code we just received for an access token
	client.getAccessToken(req.query.code, 'http://localhost:8080/callback').then(result => {
		// use the access token to fetch the user's profile information
		accessToken = result.access_token;
		refreshToken = result.refresh_token;
		console.log(result);
		client.get("/activities.json", result.access_token).then(results => {
			res.send(results[0]);
		}).catch(err => {
			res.status(err.status).send(err);
		});
	}).catch(err => {
		res.status(err.status).send(err);
	});
});

router.get("/refresh", (req, res) => {
	// exchange the authorization code we just received for an access token
	client.refreshAccessToken(accessToken, refreshToken).then(result => {
		// use the access token to fetch the user's profile information
		accessToken = result.access_token;
		refreshToken = result.refresh_token;
		client.get("/profile.json", result.access_token).then(results => {
			res.send(results[0]);
		}).catch(err => {
			res.status(err.status).send(err);
		});
	}).catch(err => {
		res.status(err.status).send(err);
	});
});

module.exports = router