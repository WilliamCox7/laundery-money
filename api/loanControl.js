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
  }
}

module.exports = loanControl;
