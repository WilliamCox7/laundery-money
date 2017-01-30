angular.module('budgetApp').service('loanSvc', function($http) {
  var calc = this;
  var loanInfo = {};
  var specLoan = {};
  this.addLoan = function(id, payee, loanAmount, payment, rate, loanType, term, termLength, nextPay) {
    return $http ({
      method: 'POST',
      url: 'loans/add',
      data: {
        id: id,
        payee: payee,
        amount: loanAmount,
        payment: payment,
        rate: rate,
        type: loanType,
        term: term,
        termLength: termLength,
        next: nextPay
      }
    }).then(function(res) {
      return res.data;
    });
  }
  this.getLoans = function(id) {
    return $http ({
      method: 'POST',
      url: 'loans/get',
      data: { id: id }
    }).then(function(res) {
      return res.data;
    });
  }
  this.calcLoans = function(loans) {
    var loanOutput = {
      principal: 0,
      interest: 0,
      afterPI: 0,
      mortgageIns: 0,
      otherTotal: 0,
      total: 0,
      totalRem: 0
    }
    var today = new Date();
    loans.forEach(function(loan) {
      var key = loan.payee.split(" ").join("");
      loanInfo[key] = {
        info: loan,
        principal: 0,
        interest: 0,
        afterPI: 0,
        mortgageIns: 0,
        otherTotal: 0,
        total: 0,
        totalRem: 0
      }
      var firstPayment = new Date(loan.firstpay);
      loanInfo[key].info.firstpay = firstPayment;
      var months = calc.monthDiff(firstPayment, today);
      var balance = loan.amount;
      var monPay = loan.payment;
      var rate = loan.rate;
      var interest, principal;
      for (var i = 0; i < months; i++) {
        interest = (balance * (rate/100)) / 12;
        principal = monPay - interest;
        balance = balance - principal;
      }
      loanOutput.principal += principal;
      loanOutput.interest += interest;
      loanOutput.afterPI += principal + interest;
      loanOutput.otherTotal += 0;
      loanOutput.total += loan.payment + 0;
      loanOutput.totalRem += balance;
      loanInfo[key].principal = principal;
      loanInfo[key].interest = interest;
      loanInfo[key].afterPI = principal + interest;
      loanInfo[key].otherTotal = 0;
      loanInfo[key].total = loan.payment + 0;
      loanInfo[key].totalRem = balance;
    });
    return loanOutput;
  }
  this.monthDiff = function(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  this.setLoan = function(payee) {
    var key = payee.split(" ").join("");
    specLoan = loanInfo[key];
  }
  this.getLoan = function() {
    return specLoan;
  }
  this.updateLoan = function(id, payee, loanAmount, payment, rate, loanType, term, termLength, nextPay) {
    return $http ({
      method: 'PUT',
      url: 'loans/update',
      data: {
        id: id,
        payee: payee,
        amount: loanAmount,
        payment: payment,
        rate: rate,
        type: loanType,
        term: term,
        termLength: termLength,
        next: nextPay
      }
    }).then(function(res) {
      return res.data;
    });
  }
  this.removeLoan = function(id, payee) {
    return $http ({
      method: 'POST',
      url: 'loans/remove',
      data: { id: id, payee: payee }
    }).then(function(res) {
      return res.data;
    });
  }
});
