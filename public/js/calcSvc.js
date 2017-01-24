angular.module('budgetApp').service('calcSvc', function($http) {
  this.addIncome = function(id, source, amount, period, next, pattern, days, deduction, percent) {
    return $http ({
      method: 'POST',
      url: 'income/add',
      data: {
        id: id,
        source: source,
        amount: amount,
        period: period,
        next: next,
        pattern: pattern,
        days: days,
        deduction: deduction,
        percent: percent
      }
    }).then(function(res) {
      return res.data;
    });
  }
  this.getIncomes = function(id) {
    return $http ({
      method: 'POST',
      url: 'income/get',
      data: { id: id }
    }).then(function(res) {
      return res.data;
    });
  }
  this.calcIncome = function(incomes) {
    var incomeOutput = {}
    var amount = 0;
    var deduction = 0;
    incomes.forEach(function(income) {
      if (income.period === 'yearly') {
        amount += income.amount;
      } else if (income.period === 'hourly') {
        amount += (income.amount * 40) * 52;
      }
      deduction += income.amount * income.percent / 100;
    });
    var preTax = amount - deduction;
    var fica = preTax * .0765;
    var federalFica = federalTax(preTax);
    var federal = federalFica - fica;
  }
});

function federalTax(gross) {
  if (gross > 418400) { return gross * .396 + 121505.25; }
  else if (gross > 416700) { return gross * .35 + 120910.25; }
  else if (gross > 191650) { return gross * .33 + 46643.75; }
  else if (gross > 91900) { return gross * .28 + 18713.75; }
  else if (gross > 37950) { return gross * .25 + 5226.25; }
  else if (gross > 9325) { return gross * .15 + 932.5; }
  else { return gross * .1; }
}
