var app = require( '../server');
var db = app.get('db');

var expenseControl = {
  getExpenses: function(req, res) {
    db.getExpenses(req.body.id, function(err, expenses) {
      res.status(200).send(expenses);
    });
  }
}

module.exports = expenseControl;
