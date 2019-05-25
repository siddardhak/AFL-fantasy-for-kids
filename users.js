var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Handlebars=require('handlebars');

var team;


router.get('/', function (req, res) {
    res.render('index', {
        Title: 'Welcome',
        styles: 'index.css'
    });
});  


// Register

router.get('/register', function (req, res) {
    res.render('register',{
        Title: 'Register',
    });
});

//videos

router.get('/videos',function(req,res){
    res.render('videos',{
        Title: 'Videos', 
    });
});





//Login

router.get('/login', function (req, res) {
    res.render('login',{
        Title: 'Login',
        styles:'login.css',
    });
});

router.get('/users/login', function (req, res) {
    res.redirect('/login');

});

//profile

router.get('/profile',function(req,res){
    res.render('profile',{
        Title: 'Profile',
        styles: 'profile.css',
    });
});

router.get('/users/profile', function (req, res) {
    res.redirect('/profile');
});

//upcoming matches

router.get('/upcomingmatches',function(req,res){
    res.render('upcomingmatches',{
        Title:'Matches',
        styles: 'upcomingmatches.css',
        
    });
});

router.get('/users/upcomingmatches',function(req,res){
    res.redirect('/upcomingmatches');
});

//leaderboard

router.get('/leaderboard',function(req,res) {
    res.render('leaderboard',{
        Title:'Leaderboard',
        styles:'leaderboard.css'
    }); 
});

router.get('/users/leaderboard', function (req, res) {
    res.redirect('/leaderboard');
});


//choose team

router.get('/users/chooseteam',function(req,res){
    res.redirect('/chooseteam');
});

router.get('/chooseteam',function(req,res){
    res.render('chooseteam',{
        Title: 'Fantasy Team',
        script: 'script.js',
        styles: 'chooseteam.css',
    });
});

router.get('/selectedteam',function(req,res){
    if (team == "Richmond") {
        team = "https://s3-ap-southeast-2.amazonaws.com/prtcbucket/richmond.png";
    }
    if (team =="Port Adelide"){
        team="https://s3-ap-southeast-2.amazonaws.com/prtcbucket/AdelidePort.png";

    }
    res.render('selectedteam',{
        Title: 'My Team',
        styles: 'selectedteam.css',
        Favteam: team,
    });
    
    
})

router.get('/users/selectedteam',function(req,res){
    res.redirect('/selectedteam');
    
});



//Register User

router.post('/chooseteam',function(req,res){
        var image1;
        
});


router.post('/register', function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var password1=req.body.cpass;
    var name = req.body.uname;
    var teamname = req.body.tname;
    var bday = req.body.bday;
    var favteam = req.body.favteam;
    team=favteam;

    
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

