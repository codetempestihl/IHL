var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
    res.render('index');
})

router.post('/', function(req, res){
    console.log(req.body);
    // hanlde signup and login process
})

module.exports = router