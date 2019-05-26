var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


//Schema

var userSchema=mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    name:{
        type:String
    },
    teamname:{
        type:String
    },
    bday:{
        type:String
    },
    favteam:{
        type:String
    },
    image1:{
        type:String
    },
    image2:{
        type:String
    },
    image3:{
        type:String
    },
    image4:{
        type:String
    },
    image5:{
        type:String
    },
    added_date:{
        type: Date,
        default: Date.now
    },
});

var User = module.exports = mongoose.model('user-login',userSchema);

module.exports.createUser = function(newUser,callback){
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password=hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername=function(email,callback){
    var query={email:email};
    User.findOne(query,callback);
}


module.exports.getUserById = function (id, callback) {
    User.findById(id,callback);
}


module.exports.comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if(err) throw err;
        callback(null,isMatch);
    });
}