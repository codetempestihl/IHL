var express = require('express')
var router = express.Router()
var passwordhash=require('password-hash');

router.get('/', function(req, res){
    res.render('index');
})

router.post('/', function(req, res){
    // hanlde signup and login process
	if (req.body.signup=='true')
	{
		var email=req.body.email;
		var pass=String(req.body.password[0]);
		//uses bscrypt or scrypt
		var hashedpassword=passwordhash.generate(pass);
		console.log(passwordhash.verify(pass,hashedpassword));//returns true
		
	}
	else
	{
		console.log('for login');
	}
})

module.exports = router
