var app = require( '../server');
var db = app.get('db');

var loanControl = {
  getLoans: function(req, res) {
    db.getLoans(req.body.id, function(err, loans) {
      res.status(200).send(loans);
    });
  },
  addLoan: function(req, res) {
    var newLoan = [
      req.body.id,
      req.body.payee,
      req.body.amount,
      req.body.payment,
      req.body.rate,
      req.body.type,
      req.body.term,
      req.body.termLength,
      req.body.next
    ];
    db.addLoan(newLoan, function(err, loan) {});
    res.status(200).send("Added Loan");
  },
  updateLoan: function(req, res) {
    var loan = [
      req.body.id,
      req.body.payee,
      req.body.amount,
      req.body.payment,
      req.body.rate,
      req.body.type,
      req.body.term,
      req.body.termLength,
      req.body.next
    ];
    db.updateLoan(loan, function(err, loan) {});
    res.status(200).send("Updated Loan");
  },
  removeLoan: function(req, res) {
    db.removeLoan(req.body.id, req.body.payee, function(err, loan) {});
    res.status(200).send('Removed');
  }
}

module.exports = loanControl;
