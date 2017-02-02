var app = require( '../server');
var db = app.get('db');

var expenseAPI = {

  /* GETS ALL EXPENSES FOR USER */
  getExpenses: function(req, res) {
    db.getExpenses(req.body.id, function(err, expenses) {
      res.status(200).send(expenses);
    });
  },

  /* ADDS ALL EXPENSES FROM UPLOAD */
  insertExpenses: function(req, res) {
    var expenseInfo = req.body.info;
    for (var i = 0; i < expenseInfo.length; i++) {
      if (i !== expenseInfo.length - 1) {
        db.insertExpense(expenseInfo[i], function(err, expense) {});
      } else {
        db.insertExpense(expenseInfo[i], function(err, expense) {
          res.status(200).send("Added All Expenses");
        });
      }
    }
  },

  /* SAVES USER PREFERENCES FOR UPLOAD */
  saveKeywords: function(req, res) {
    var keywordInfo = req.body.info;
    for (var i = 0; i < keywordInfo.length; i++) {
      if (i !== keywordInfo.length - 1) {
        db.saveKeyword(keywordInfo[i], function(err, keywords) {});
      } else {
        db.saveLastKeyword(keywordInfo[i], function(err, keywords) {
          res.status(200).send("Added All Expenses");
        });
      }
    }
    res.status(200).send("Added All Keyword Info");
  },

  /* GETS USER PREFERENCES */
  getKeywords: function(req, res) {
    db.getKeywords(req.body.id, function(err, keywords) {
      res.status(200).send(keywords);
    });
  },

  /* DELETES THE SELECTED USER PREFERENCE */
  removeKeyword: function(req, res) {
    db.removeKeyword(req.body.id, req.body.keyword, function(err, keyword) {});
    res.status(200).send("Removed Keyword");
  }

}

module.exports = expenseAPI;
