var app = require( '../server');
var db = app.get('db');

var authAPI = {

  /* SENDS USER INFO ON LOGIN */
  login: function(req, res) {
    res.status(200).send(req.user);
  },

  /* SENDS USER INFO ON SIGNUP */
  signup: function(req, res) {
    res.status(200).send(req.user);
  },

  /* SENDS USER INFO */
  sendUsr: function(req, res) {
    if (!req.session.passport.user) { return res.sendStatus(404); }
    else { res.status(200).send(req.session.passport.user); }
  },

  initUsr: function(req, res) {
    db.getInit(req.body.id, function(err, status) {
      res.status(200).send(status);
    });
  },

  getStarted: function(req, res) {
    db.addBalance(req.body.id, true, req.body.balance, function(err, status) {});
    res.status(200).send('Added Balance');
  }

}

module.exports = authAPI;
