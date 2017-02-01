var app = require( '../server');

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
    if (!req.user) { return res.sendStatus(404); }
    else { res.status(200).send(req.user); }
  }

}

module.exports = authAPI;
