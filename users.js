var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// Register

router.get('/register', function (req, res) {
    res.render('register');
});


//Login

router.get('/login', function (req, res) {
    res.render('login');
});

//profile

router.get('/profile',function(req,res){
    res.render('profile');
});

//Register User

router.post('/register', function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var password1=req.body.cpass;
    var name = req.body.uname;
    var teamname = req.body.tname;
    var bday = req.body.bday;
    var favteam = req.body.favteam;

    
    //validation
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('email','email is not valid').isEmail();
    req.checkBody('bday','please enter date of birth').notEmpty();
    if(password!=password1){
        req.checkBody('password1', 'passwords do not match').equals(req.body.password);
    }
    var errors=req.validationErrors();
    console.log(errors);
    console.log(password1);
    console.log(req.body.password);

    if(errors){
        res.render('register',{
           errors:errors     
     });
    }
    else{
        var newUser= new User({
            email:email,
            password:password,
            name:name,
            teamname:teamname,
            bday:bday,
            favteam:favteam

        });

        User.createUser(newUser, function(err,user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg','You are registered and now can login');
        res.redirect('/users/login');

    }
});

//local Strategy

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (username, password, done) {
     User.getUserByUsername(username,function(err,user){
         if(err) throw err;
         if(!user){
            return done(null,false,{message:'Unknown user'});
         }
         User.comparePassword(password,user.password,function(err,isMatch){
            if(err) throw err;
            if(isMatch){
                return done(null,user);
            }
            else{
                return done(null,false,{message:'invalid password'});
            }
         });
     });   
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});



// Login User

router.post('/login',
    passport.authenticate('local',{successRedirect:'/users/profile',failureRedirect:'/users/login',failureFlash: true}),
    function (req, res) {
        res.redirect('/users/profile');
});

//logout

router.get('/logout',function (req,res) {
    req.logout();
    res.redirect('/');
    
})



module.exports = router;

