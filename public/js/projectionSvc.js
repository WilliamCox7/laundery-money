angular.module('budgetApp').service('projectionSvc',

  function($http) {

    var calc = this;
    var iDone = false;
    var eDone = false;
    var lDone = false;
    var balance = 0;
    var projInfo = {};

    var leftOverOutput = {
      0: 0, 1: 0, 2: 0,
      3: 0, 4: 0, 5: 0,
      6: 0, 7: 0, 8: 0,
      9: 0, 10: 0, 11: 0
    }

    calc.calcLeftOver = function() {
      if (iDone && eDone && lDone) {
        console.log("calculating left over");
        for (var i = 0; i < 12; i++) {
          if (i !== 0) {
            leftOverOutput[i] += leftOverOutput[i-1];
          } else {
            leftOverOutput[0] += balance;
          }
        }
      }
    }

    this.calcLeftOverAgain = function(inc, exp, loan) {
      var leftOverOutput = {
        0: 0, 1: 0, 2: 0,
        3: 0, 4: 0, 5: 0,
        6: 0, 7: 0, 8: 0,
        9: 0, 10: 0, 11: 0
      }
      for (var i = 0; i < 12; i++) {
        if (i !== 0) { leftOverOutput[i] += leftOverOutput[i-1]; }
        else {leftOverOutput[0] += balance;}
        leftOverOutput[i] += inc[i];
        for (var prop in exp) {
          leftOverOutput[i] -= exp[prop][i];
        }
        for (var prop in loan) {
          leftOverOutput[i] -= loan[prop][i];
        }
      }
      return leftOverOutput;
    }

    this.getProjInfo = function() {
      return projInfo;
    }

    this.getLeftOver = function() {
      return leftOverOutput;
    }

    this.saveBalance = function(b) {
      balance = b;
    }

    this.calcIncome = function(incomes) {

      var thisYear = new Date().getFullYear();
      var beginning = new Date(thisYear, "0", "1");
      var end = new Date(thisYear, "11", "31");
      beginning = Number(beginning) / (1000*60*60*24);
      end = Number(end) / (1000*60*60*24);

      var income = {
        0: balance, 1: 0, 2: 0,
        3: 0, 4: 0, 5: 0,
        6: 0, 7: 0, 8: 0,
        9: 0, 10: 0, 11: 0
      }

      for (var inc in incomes) {

        var firstPayDate = incomes[inc].payDate;
        payDate = Number(incomes[inc].payDate) / (1000*60*60*24);

        if (payDate < beginning) {
          while (payDate < beginning) { payDate += 14; }
        } else {
          while (payDate > beginning) { payDate -= 14; }
          payDate += 14;
        }

        while (payDate < end) {
          var d =  new Date(payDate * (1000*60*60*24));
          var month = d.getMonth();
          if (d >= firstPayDate) {
            income[month] += incomes[inc].biWeeklyNet;
            leftOverOutput[month] += incomes[inc].biWeeklyNet;
          }
          payDate += 14;
        }

      }

      iDone = true;
      calc.calcLeftOver();

      projInfo.income = income;

      return income;

    }

    this.calcExpenses = function(expenses) {

      var currentMonth = new Date().getMonth();

      for (var category in expenses) {
        for (var month in expenses[category]) {
          if (month > currentMonth) {
            expenses[category][month] = expenses[category].projection;
            leftOverOutput[month] -= Math.abs(expenses[category].projection);
          }
          else {
            expenses[category][month] = expenses[category][month];
            leftOverOutput[month] -= Math.abs(expenses[category][month]);
          }
        }
      }

      eDone = true;
      calc.calcLeftOver();

      projInfo.expenses = expenses;

      return expenses;

    }

    this.calcLoans = function(loans) {

      var currentDate = new Date();
      var currentMonth = currentDate.getMonth();
      var currentDay = currentDate.getDate();
      var loanOutput = {};

      for (var loan in loans) {
        loanOutput[loan] = {
          0: 0, 1: 0, 2: 0,
          3: 0, 4: 0, 5: 0,
          6: 0, 7: 0, 8: 0,
          9: 0, 10: 0, 11: 0
        }

        var firstPayment = new Date(loans[loan].firstPayment);
        var payDate = firstPayment.getDay();

        for (var i = 0; i < 12; i++) {
          var firstOfMonth = new Date(currentDate.getFullYear(), i, '1');
          if (i > currentMonth) {
            if (firstOfMonth >= firstPayment) {
              loanOutput[loan][i] = loans[loan].monthlyPayment;
              leftOverOutput[i] -= Math.abs(loans[loan].monthlyPayment);
            }
          } else {
            if (currentDate >= firstPayment) {
              loanOutput[loan][i] = loans[loan].monthlyPayment;
              leftOverOutput[i] -= Math.abs(loans[loan].monthlyPayment);
            }
          }
        }

      }

      lDone = true;
      calc.calcLeftOver();

      projInfo.loans = loanOutput;

      return loanOutput;

    }

  }

);
