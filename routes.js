var express = require('express')
var router = express.Router()
var passwordhash=require('password-hash');

//setup mongoose
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/ihl", { useNewUrlParser: true });
var db=mongoose.connection;
db.once('open',()=>{
	console.log("connected");
});
//MongoDb schema and model
var userSchema = new mongoose.Schema({
	email:{type: String,required :true},
	password:{type:String,required:true},
	fblinked:Boolean });
	
var User = mongoose.model('User', userSchema);

const FitbitApiClient = require("fitbit-node");
const client = new FitbitApiClient({
    clientId: "22DJKT",
    clientSecret: "035c49af103fcf40103a5191b88a3381",
    apiVersion: '1.2' // 1.2 is the default
});

router.get('/', function(req, res){
    res.render('index');
})

router.post('/', function(req, res){
    
    // hanlde signup and login process
	if (req.body.signup=='true')
	{
		 var pass=String(req.body.password[0]);
		 hashedpassword=passwordhash.generate(pass);
		 User.find({ email: req.body.email }, function(err, user){
			 if (err) throw err;
			 
			 if (Object.keys(user).length==0){
				 console.log("hey");
					userdata=new User({
					email:req.body.email,
					password:hashedpassword,
					fblinked:true	
				});
				userdata.save(function(err){
					if(err) throw err; 
					console.log("user created");
				});}
				else
				{
					console.log("user already exist");
					User.find({},function(err,user){
						if (err) throw err;
						console.log(user);
					})
				}
		 });
	}
	else if(req.body.login=="true")
	{
		User.find({email:req.body.email},function(err,user){
			if (err) throw err;
			if (Object.keys(user).length==0)
			{console.log("user doessnt exist sign up please");}
			else if( user.fblink!=true)
			{console.log(user,"logged in");
				user.fblink=true;
			console.log(user,"logged in");}
			else
			{console.log(user,"logged in");
			}
		})
	}
	else
	{
		
	}
})

router.get('/home', function(req, res){
    res.render('home');
})

router.get('/fitbit', function(req, res){
    res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:8080/callback'));
})

// handle the callback from the Fitbit authorization flow
router.get("/callback", (req, res) => {
	// exchange the authorization code we just received for an access token
	client.getAccessToken(req.query.code, 'http://localhost:8080/callback').then(result => {
		// use the access token to fetch the user's profile information
		client.get("/profile.json", result.access_token, '7BWXP7').then(results => {
			res.send(results[0]);
		}).catch(err => {
			res.status(err.status).send(err);
		});
	}).catch(err => {
		res.status(err.status).send(err);
	});
});
module.exports = User;
module.exports = router;