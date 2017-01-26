var app = require( '../server');

var authControl = {
  login: function(req, res) {
    res.status(200).send(req.user);
  },
  signup: function(req, res) {
    res.status(200).send(req.user);
  },
  sendUsr: function(req, res) {
    if (!req.user) return res.sendStatus(404);
    res.status(200).send(req.user);
  }
}

module.exports = authControl;
