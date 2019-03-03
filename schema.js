//setup mongoose
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/ihl", { useNewUrlParser: true });
var db=mongoose.connection;
// db.once('open',()=>{
// 	console.log("connected");
// });
//MongoDb schema and model
var userSchema = new mongoose.Schema({
	first_name:{type: String,required :true},
	last_name:{type: String,required :true},
	email: {type: String,required :true},
	password: {type:String,required:true},
	profileimg:String,
	bio:String,
    socialMedia: [{
        socialHandle: String,
        linkedId: String
    }],
    devices: [{
        name: String,
        user_id: String
    }],
    activeDevice: String
});

var kiosk_data = new mongoose.Schema({
    DateTime : Date,
    Weight : Number,
    BMI : Number,
    BmiClass : String,
    FatRatio : Number,
    FatClass : String,
    PulseBPM : Number,
    PulseClass : String,
    Systolic : Number,
    Diastolic : Number,
    BpClass : String,
    Gender : String,
    Age : Number,
    Height : Number,
    SpO2 : Number,
    Temperature : Number,
    TemperatureClass : String,
    SpO2Class : String,
    user_id : String
});

var challengeSchema = new mongoose.Schema({
    type: String,
    created_by: String,
    duration: String,
    start_date: Date,
    users: [String],
});

module.exports.User = mongoose.model('User', userSchema, 'users');
module.exports.Kiosk = mongoose.model('Kiosk', kiosk_data, 'kiosk_data');
module.exports.Challenges = mongoose.model('Challenges', challengeSchema, 'challenges');