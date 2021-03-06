/* PACKAGES */
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

var app = module.exports = express();

app.use(session({ secret: config.secret, saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var massiveInstance = massive.connectSync({
  connectionString: 'postgres://' + config.postgres.user + ':' + config.postgres.pass + '@localhost:4000/laundery_money'
});

app.set('db', massiveInstance);
var db = app.get('db');

var incomeAPI = require('./api/incomeAPI');
var authAPI = require('./auth/authAPI');
var expenseAPI = require('./api/expenseAPI');
var loanAPI = require('./api/loanAPI');
var projectionAPI = require('./api/projectionAPI');

/* AUTH */
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(obj, done) { done(null, obj); });

/* LOCAL STRATEGY */// -- LOG IN
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

app.post('/auth/local', passport.authenticate('local'), authAPI.login);

/* LOCAL STRATEGY */// -- SIGN UP
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
          db.initUser(user.id, false, function(err, init) {});
          return done(null, user);
        });
      } else {
        return done(err);
      }
    });
  }
));

app.post('/auth/signup', passport.authenticate('signup'), authAPI.signup);

/* FACEBOOK STRATEGY */
passport.use(new FacebookStrategy({
    clientID: config.fb.clientID,
    clientSecret: config.fb.clientSecret,
    callbackURL: "http://localhost:3000/auth/fb/callback"
  },
  function(token, refreshToken, profile, done) {
    var fb_id = profile.id;
    db.checkFbUser([fb_id], function(err, user) {
      if (!user[0]) {
        var first = profile.displayName.split(" ")[0];
        var last = profile.displayName.split(" ")[1];
        db.createUser([null, null, fb_id, null, first, last, null], function(err, newUser) {
          db.initUser(newUser[0].id, false, function(err, init) {});
          return done(err, newUser[0]);
        });
      } else {
        return done(err, user[0]);
      }
    });
  }
));

app.get('/auth/fb', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/fb/callback', passport.authenticate('facebook', {
    successRedirect : '/#!/home/options',
    failureRedirect : '/#!/login'
}));

/* GOOGLE STRATEGY */
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    var gplus_id = profile.id;
    db.checkGoogleUser([gplus_id], function(err, user) {
      if (!user[0]) {
        var first = profile.displayName.split(" ")[0];
        var last = profile.displayName.split(" ")[1];
        var email = profile.email;
        db.createUser([null, null, null, gplus_id, first, last, email], function(err, newUser) {
          db.initUser(newUser[0].id, false, function(err, init) {});
          return done(err, newUser[0]);
        });
      } else {
        return done(err, user[0]);
      }
    });
  }
));

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/#!/home/options',
    failureRedirect : '/#!/login'
}));

/* OTHER AUTH ENDPOINTS */
app.get('/auth/me', authAPI.sendUsr);
app.post('/init', authAPI.initUsr);
app.post('/init/getStarted', authAPI.getStarted);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/#!/login');
});

/* INCOME */
app.post('/income/add', incomeAPI.addIncome);
app.post('/income/get', incomeAPI.getIncomes);
app.put('/income/update', incomeAPI.updateIncome);
app.post('/income/remove', incomeAPI.deleteIncome);

/* EXPENSES */
app.post('/expense/get', expenseAPI.getExpenses);
app.post('/expense/insert', expenseAPI.insertExpenses);
app.post('/expense/keyword', expenseAPI.saveKeywords);
app.post('/expense/getKeywords', expenseAPI.getKeywords);
app.post('/expense/removeKeyword', expenseAPI.removeKeyword);

/* LOANS */
app.post('/loans/get', loanAPI.getLoans);
app.post('/loans/add', loanAPI.addLoan);
app.put('/loans/update', loanAPI.updateLoan);
app.post('/loans/remove', loanAPI.removeLoan);

/* SERVER */
app.listen(port, function() {
  console.log('port ' + port + ' is listening');
});

/* LESS MANAGEMENT */
fs.readFile('styles.less', function(err, styles) {
    less.render(styles.toString(), function(er, css) {
        fs.writeFile('./public/styles/styles.css', css.css, function(e) {
            console.log('Compiled CSS');
        });
    });
});
