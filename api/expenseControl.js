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
      db.insertExpenses(expenseInfo[i], function(err, expense) {});
    }
    res.status(200).send("Added All Expenses");
  },
  saveKeywords: function(req, res) {
    var keywordInfo = req.body.info;
    for (var i = 0; i < keywordInfo.length; i++) {
      db.saveKeyword(keywordInfo[i], function(err, info) {});
    }
    res.status(200).send("Add All Keyword Info");
  },
  getKeywords: function(req, res) {
    db.getKeywords(req.body.id, function(err, keywords) {
      res.status(200).send(keywords);
    });
  }
}

module.exports = expenseControl;
