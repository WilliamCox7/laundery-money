var app = require( '../server');
var db = app.get('db');

var incomeControl = {
  addIncome: function(req, res) {
    var newIncome = [
      req.body.id,
      req.body.source,
      req.body.amount,
      req.body.period,
      req.body.next,
      req.body.pattern,
      req.body.days,
      req.body.deduction,
      req.body.percent
    ];
    db.addIncome(newIncome, function(err, income) {});
    res.status(200).send('Income Added');
  },
  getIncomes: function(req, res) {
    db.getIncomes(req.body.id, function(err, incomes) {
      res.status(200).send(incomes);
    });
  },
  updateIncome: function(req, res) {
    var updatedIncome = [
      req.body.id,
      req.body.source,
      req.body.amount,
      req.body.period,
      req.body.next,
      req.body.pattern,
      req.body.days,
      req.body.deduction,
      req.body.percent
    ];
    db.updateIncome(updatedIncome, function(err, income) {});
    res.status(200).send('Income Updated')
  },
  deleteIncome: function(req, res) {
    db.removeIncome([req.body.id, req.body.source], function(err, income) {});
    res.status(200).send('Removed');
  }
}

module.exports = incomeControl;
