var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var config = require('./config.js');
var massive = require('massive');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var less = require('less');
var fs = require('fs');
var port = 3000;

var app = express();

app.use(session({ secret: config.secret, saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var massiveInstance = massive.connectSync({connectionString: 'postgres://postgres:Kmalone32@localhost:4000/laundery_money'})
app.set('db', massiveInstance);
var db = app.get('db');

passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(obj, done) { done(null, obj); });
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    db.getUserByUsername([username], function(err, user) {
      user = user[0];
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    })
  }
));

passport.use('signup', new LocalStrategy({
  passReqToCallback: true
}, function(req, username, password, done) {
    db.getUserByUsername([username], function(err, user) {
      if (!user[0]) {
        var newUser = {
          username: username,
          password: password,
          fb_id: null,
          gplus_id: null,
          first: req.body.firstName,
          last: req.body.lastName,
          email: null
        };
        db.users.save(newUser, function(err, user) {
          return done(null, user); //user is not being sent on signup
        });
      } else {
        return done(err);
      }
    });
  }
));

app.post('/auth/local', passport.authenticate('local'), function(req, res) {
  res.status(200).send(req.user);
});

app.post('/auth/signup', passport.authenticate('signup'), function(req, res) {
  res.status(200).send(req.user);
});

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  res.status(200).send(req.user);
});

passport.use(new FacebookStrategy({
    clientID: config.fb.clientID,
    clientSecret: config.fb.clientSecret,
    callbackURL: "http://localhost:3000/auth/fb/callback"
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function () {
      var fb_id = profile.id;
      db.checkFbUser([fb_id], function(err, user) {
        if (!user[0]) {
          var first = profile.displayName.split(" ")[0];
          var last = profile.displayName.split(" ")[1];
          db.createFbUser([fb_id, first, last], function(err, user) {});
          db.createUser([null, null, fb_id, null, first, last, null], function(err, user) {});
        }
      });
      return done(null, profile);
    });
  }
));

app.get('/auth/fb', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/fb/callback', passport.authenticate('facebook', {
    successRedirect : '/#!/home/options',
    failureRedirect : '/#!/login'
}));

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      var gplus_id = profile.id;
      db.checkGoogleUser([gplus_id], function(err, user) {
        if (!user[0]) {
          var first = profile.displayName.split(" ")[0];
          var last = profile.displayName.split(" ")[1];
          var email = profile.email;
          db.createGoogleUser([gplus_id, first, last], function(err, user) {});
          db.createUser([null, null, null, gplus_id, first, last, email], function(err, user) {});
        }
      });
      return done(null, profile);
    });
  }
));

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/#!/home/options',
    failureRedirect : '/#!/login'
}));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/#!/login');
});

app.listen(port, function() {
  console.log('port ' + port + ' is listening');
});

fs.readFile('styles.less', function(err, styles) {
    less.render(styles.toString(), function(er, css) {
        fs.writeFile('./public/styles/styles.css', css.css, function(e) {
            console.log('Compiled CSS');
        });
    });
});
