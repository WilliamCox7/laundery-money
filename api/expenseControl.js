var app = require( '../server');
var db = app.get('db');

var expenseControl = {
  getExpenses: function(req, res) {
    db.getExpenses(req.body.id, function(err, expenses) {
      res.status(200).send(expenses);
    });
  },
  insertExpenses: function(req, res) {
    var expenseInfo = req.body.info;
    for (var i = 0; i < expenseInfo.length; i++) {
      console.log(expenseInfo[i]);
      db.insertExpenses(expenseInfo[i], function(err, expense) {});
    }
    res.status(200).send("Added All Expenses");
  }
}

module.exports = expenseControl;
