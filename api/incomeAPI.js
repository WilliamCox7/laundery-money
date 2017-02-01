var app = require( '../server');
var db = app.get('db');

var incomeAPI = {

  /* ADDS USER CREATED INCOME */
  addIncome: function(req, res) {
    var newIncome = [
      req.body.id, req.body.source, req.body.amount,
      req.body.period, req.body.next, req.body.pattern,
      req.body.days, req.body.deduction, req.body.percent
    ];
    db.addIncome(newIncome, function(err, income) {});
    res.status(200).send('Income Added');
  },

  /* GETS ALL INCOMES FOR USER */
  getIncomes: function(req, res) {
    db.getIncomes(req.body.id, function(err, incomes) {
      res.status(200).send(incomes);
    });
  },

  /* UPDATES INCOME EDITED BY USER */
  updateIncome: function(req, res) {
    var updatedIncome = [
      req.body.id, req.body.source, req.body.amount,
      req.body.period, req.body.next, req.body.pattern,
      req.body.days, req.body.deduction, req.body.percent
    ];
    db.updateIncome(updatedIncome, function(err, income) {});
    res.status(200).send('Income Updated')
  },

  /* DELETES INCOME SELECTED BY USER */
  deleteIncome: function(req, res) {
    db.removeIncome([req.body.id, req.body.source], function(err, income) {});
    res.status(200).send('Income Removed');
  }

}

module.exports = incomeAPI;
