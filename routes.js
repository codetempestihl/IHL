var express = require('express')
var router = express.Router()
var passwordhash=require('password-hash');
var User = require('./schema.js').User
var Kiosk = require('./schema.js').Kiosk
var Challenges = require('./schema.js').Challenges
var client = require('./fitbit.js')

var loginParam = {
	loggedIn: null,
	errSignUp: null,
	errLogin: null,
	errMsg: null
}

const redirectlogin = function(req, res, next){
	if(req.session.user){
		next()
	}else{
		res.redirect('/')
	}
}

router.get('/', function(req, res){
	if(req.session.user){
		res.redirect('/home')
	}else{
		loginParam.loggedIn = req.session.user
		res.render('index', loginParam);
	}
})

router.post('/', function(req, res){
	// hanlde signup and login process
	if(req.body.signup){
		var pass=String(req.body.password[0]);
		hashedpassword=passwordhash.generate(pass);
		User.find({ email: req.body.email }, function(err, user){
			if (err) throw err;

			socialHandle = null
			linkedId = null

			if(req.body.socialHandle != null){
				socialHandle = req.body.socialHandle
				linkedId = req.body.email
			}

			if (Object.keys(user).length==0){
				userdata=new User({
					first_name:req.body.firstname,
					last_name:req.body.lastname,
					email:req.body.email,
					password:hashedpassword,
					profilepic:req.body.profileUrl,
					fblinked: req.body.fblinksignup,
					bio:'',
					socialMedia: [{
						socialHandle: socialHandle,
						linkedId: linkedId
					}],
					devices: [],
					activeDevice: null
				});

				userdata.save(function(err){
					if(err) throw err;
					req.session.user = [userdata];
					res.redirect('/home');
				});
			}else{
				loginParam.loggedIn = req.session.user
				loginParam.errSignUp = true
				loginParam.errMsg = 'User Already Exists'
				res.render('index', loginParam)
			}
		});

	}
	else if(req.body.loginHandle){
		User.find({'socialMedia.socialHandle': req.body.loginHandle, 'socialMedia.linkedId': req.body.email},function(err,user){
			if (err) throw err;
			if (Object.keys(user).length==0){
				console.log("user doessnt exist sign up please");
			}else{
				req.session.user=user;
				res.redirect('/home');
			}
		})
	}else{
		var emailadd=req.body.email;
		var pass=req.body.password;
		User.find({email:emailadd},function(err,user){
			if (err) console.log(error);
			if(Object.keys(user).length!=0){
				if(passwordhash.verify(pass,user[0].password)==true){
					req.session.user=user;
					res.redirect('/home');
				}
				else{
					loginParam.errLogin = true
					loginParam.errMsg = "Wrong Password"
					res.render('index', loginParam);
				}
			}
			else{
				loginParam.errLogin = true
				loginParam.errMsg = "No User Found. SignUp to continue"
				res.render('index', loginParam);
			}
		})
	}
})

// route for home
router.get('/home', redirectlogin, function(req, res){
	activeDevice = req.session.user[0].activeDevice
	if(activeDevice == "kiosk"){
		Kiosk.find({user_id: req.session.user[0]._id}, function(err, data){
			res.render('home', {name:req.session.user[0].first_name,
				profileimg:req.session.user[0].profilepic,
				loggedIn: req.session.user,
				kiosk_data: data,
				activeDevice: activeDevice
			})
		})
	}else{
		res.render('home', {name:req.session.user[0].first_name,
			profileimg:req.session.user[0].profilepic,
			loggedIn: req.session.user,
			kiosk_data: null,
			activeDevice: activeDevice
		})
		// res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:8080/callback'));
	}
})

// route for friends
router.get('/friends', redirectlogin, function(req, res){
	res.render('friends', {loggedIn: req.session.user, profileimg: req.session.user[0].profileimg});
})

router.get('/report', redirectlogin, function(req, res){
	res.render('report', {loggedIn: req.session.user, profileimg: req.session.user[0].profileimg});
})
// route for challenges
router.get('/challenges', redirectlogin, function(req, res){
	User.find({email: {$ne:req.session.user[0].email}}, function(err, users){
		Challenges.find({users: req.session.user[0].email}, function(err, challenges){
			res.render('challenges', {loggedIn: req.session.user, profileimg: req.session.user[0].profileimg, users: users, challenges: challenges});
		})
	})
})

router.post('/createChallenge', redirectlogin, function(req, res){
	challenge=new Challenges({
		type: req.body.type,
		created_by: req.body.created_by,
		duration: req.body.duration,
		start_date: req.body.start_date,
		users: JSON.parse(req.body.users)
	});

	challenge.save(function(err){
		if(err) throw err;
		res.redirect('/home');
	});
})

// route for achievements
router.get('/achievements', redirectlogin, function(req, res){
	res.render('achievements', {loggedIn: req.session.user, profileimg: req.session.user[0].profileimg});
})

// route for leaderboard
router.get('/leaderboard', redirectlogin, function(req, res){
	res.render('leaderboard', {loggedIn: req.session.user, profileimg: req.session.user[0].profileimg});
})

// route for settings
router.get('/settings', redirectlogin, function(req, res){
	client.get('/activities/goals/daily.json', req.session.fitbit.access_token).then(result =>{
			var steps=result[0].goals.steps;
			var calories=result[0].goals.caloriesOut;
			client.get('/profile.json', req.session.fitbit.access_token).then(results =>{
				 var weight=results[0]['user']['weight'];
				 res.render('settings', {
	 				firstname:req.session.user[0].first_name,
	 				lastname:req.session.user[0].last_name,
	 				profileimg:req.session.user[0].profilepic,
	 				steps:steps,
	 				calories:calories,
	 				weight:weight,
	 				bio:req.session.user[0].bio,
	 				loggedIn: req.session.user});
	 			}).catch(err => {
					 console.log(err)
				 })
			}).catch(err => {
				res.render('settings', {
				 firstname:req.session.user[0].first_name,
				 lastname:req.session.user[0].last_name,
				 profileimg:req.session.user[0].profilepic,
				 steps:null,
				 calories:null,
				 weight:null,
				 bio:req.session.user[0].bio,
				 loggedIn: req.session.user});
			 })
		 })

router.post('/settings',function(req,res){
	if (req.body.details!=null){
		if (req.session.user[0].first_name!=req.body.firstName){
			if(req.body.firstName!=''){
			User.updateOne({email:req.session.user[0].email},{$set:{first_name:req.body.firstName}},{ upsert: true },function(err){});
			req.session.user[0].first_name=req.body.firstName;
			}
		}
		if (req.session.user[0].last_name!=req.body.lastName){
			User.updateOne({email:req.session.user[0].email},{$set:{last_name:req.body.lastName}},{ upsert: true },function(err){});
			req.session.user[0].last_name=req.body.lastName;
		}
		if (req.session.user[0].bio!=req.body.bio){
			User.updateOne({email:req.session.user[0].email},{$set:{bio:req.body.bio}},{ upsert: true },function(err){});
			req.session.user[0].bio=req.body.bio;
		}
		if (req.body.new_pass!='') {
			if(passwordhash.verify(req.body.old_pass,req.session.user[0].password)==true){
				User.updateOne({email:req.session.user[0].email},{$set:{password:passwordhash.generate(req.body.new_pass)}},{ upsert: true },function(err){});
			}
		}
	}
	else{
		data = {
			caloriesOut: req.body.calories,
			steps: req.body.steps
		}
		client.post('/activities/goals/daily.json', req.session.fitbit.access_token, data).then(result => {
			// console.log(result)
		}).catch(err =>{
			// console.log("not updated");
		});
	}
	res.redirect('/settings');
})

router.get('/logout',function(req,res){
	req.session.destroy();
	res.redirect('/');
});

// router.get('/participants',redirectlogin, function(req,res){
// 	if(req.session.fitbit.access_token){
// 		Challenges.find({_id: req.body.id}, function(err, challenge){
// 			var leaderboard = {}
// 			challenge.users.forEach(userEmail => {
// 				User.find({ email: userEmail, function(err, user){

// 					var steps=client.get('/activities/' + challenge.type + '/date/' + challenge.start_date + '/' + challenge.duration, req.session.fitbit.access_token, user.devices.user_id).then(results =>{
// 						leaderboard[user.name]=results[0]['activities-'+challenge.type];
// 					})
// 				})
// 			});
// 			console.log(leaderboard);
// 		})
// 	}
// });

router.get("/fitbit", (req, res) => {
	res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:8080/callback'));
})

// handle the callback from the Fitbit authorization flow
router.get("/callback", (req, res) => {
	// exchange the authorization code we just received for an access token
	client.getAccessToken(req.query.code, 'http://localhost:8080/callback').then(result => {
		req.session.fitbit = {}

		req.session.fitbit.access_token = result.access_token
		req.session.fitbit.refresh_token = result.refresh_token
		req.session.user[0].activeDevice = 'fitbit'
		req.session.user[0].devices.push({
			name: 'fitbit',
			user_id: result['user_id']
		})
		User.find({'devices.name':{$in: ['fitbit']},email:req.session.user[0].email},function(err,devices){
			console.log(devices)
			if (devices.length>0){
			User.updateOne({},{$set:{devices:{user_id:result['user_id']}}}, function(err){})	
			}
			else{
				User.updateMany({email:req.session.user[0].email},{$push:{devices:{name:'fitbit',user_id:result['user_id']}}},function(){})
			}	
	})
		
		res.redirect('/home')
	}).catch(err => {
		res.status(err.status).send(err);
	});
});

module.exports = router;
