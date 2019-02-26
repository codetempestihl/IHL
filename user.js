//setup mongoose
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/ihl", { useNewUrlParser: true });
var db=mongoose.connection;
// db.once('open',()=>{
// 	console.log("connected");
// });
//MongoDb schema and model
var userSchema = new mongoose.Schema({
	name:{type: String,required :true},
	email: {type: String,required :true},
	password: {type:String,required:true},
	profilepic:String,
	fblinked: Boolean,
	fitbit: {
		access_token: String,
		refresh_token: String
	}
});

module.exports = mongoose.model('User', userSchema, 'users');
