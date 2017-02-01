angular.module('budgetApp').service('incomeSvc',

  function($http) {

    var calc = this;
    var incomeInfo = {}; //SAVED INFORMATION FOR WHEN A USER SELECTS AN INCOME
    var selectedIncome = {}; //INCOME FOR INCOME-EDIT VIEW

    /* SAVED INFORMATION FOR PROJECTIONS */
    var incProjectionInfo = { biWeeklyNet: 0, payDate: null };
    this.getIncProjectionInfo = function() {
      return incProjectionInfo;
    }

    /* GETS A SPECIFIC (SELECTED) INCOME */
    this.getIncome = function() {
      return selectedIncome;
    }

    /* GETS ALL INCOMES FOR USER */
    this.getIncomes = function(id) {
      return $http ({
        method: 'POST',
        url: 'income/get',
        data: { id: id }
      }).then(function(res) {
        return res.data;
      });
    }

    /* ADDS INCOME CREATED BY USER */
    this.addIncome = function(id, source, amount, period, next, pattern, days, deduction, percent) {
      return $http ({
        method: 'POST',
        url: 'income/add',
        data: {
          id: id, source: source, amount: amount,
          period: period, next: next, pattern: pattern,
          days: days, deduction: deduction, percent: percent
        }
      }).then(function(res) {
        return res.data;
      });
    }

    /* SETS A SPECIFIC (SELECTED) INCOME */
    this.setIncome = function(source) {
      var key = source.split(" ").join("");
      selectedIncome = incomeInfo[key];
    }

    /* UPDATES INCOME SELECTED BY USER */
    this.updateIncome = function(id, source, amount, period, next, pattern, days, deduction, percent) {
      return $http ({
        method: 'PUT',
        url: 'income/update',
        data: {
          id: id, source: source, amount: amount,
          period: period, next: next, pattern: pattern,
          days: days, deduction: deduction, percent: percent
        }
      }).then(function(res) {
        return res.data;
      });
    }

    /* DELETES INCOME SELECTED BY USER */
    this.removeIncome = function(id, source) {
      return $http ({
        method: 'POST',
        url: 'income/remove',
        data: { id: id, source: source }
      }).then(function(res) {
        return res.data;
      });
    }

    /* CREATES OUTPUT INFORMATION FOR INCOME VIEWS */
    this.calcIncome = function(incomes) {

      var incomeOutput = {
        gross: { b: 0, m: 0, y: 0 },
        preTax: { b: 0, m: 0, y: 0 },
        after: { b: 0, m: 0, y: 0 },
        ss: { b: 0, m: 0, y: 0 },
        med: { b: 0, m: 0, y: 0 },
        fed: { b: 0, m: 0, y: 0 },
        state: { b: 0, m: 0, y: 0 },
        net: { b: 0, m: 0, y: 0 }
      }

      incomes.forEach(function(income) {

        /* SAVE INFO */
        var key = income.source.split(" ").join("");
        incomeInfo[key] = incomeOutput;
        incomeInfo[key].info = income;
        var next = new Date(income.next);
        incomeInfo[key].info.next = next;
        incProjectionInfo.payDate = next;

        /* GROSS INCOME */
        var gross = 0;
        if (income.period === 'hourly') {
          gross = income.amount * 40 * 52;
        } else {
          gross = income.amount;
        }

        incomeOutput.gross.y += gross;
        incomeOutput.gross.m += gross / 12;
        incomeOutput.gross.b += gross / 26;
        incomeInfo[key].gross.y = gross;
        incomeInfo[key].gross.m = gross / 12;
        incomeInfo[key].gross.b = gross / 26;

        /* PRE-TAX DEDUCTIONS */
        var deduction = 0;
        if (income.percent !== null) { deduction = gross * (income.percent / 100); }
        var preTax = gross - deduction;
        incomeOutput.preTax.y += deduction;
        incomeOutput.preTax.m += deduction / 12;
        incomeOutput.preTax.b += deduction / 26;
        incomeInfo[key].preTax.y = deduction;
        incomeInfo[key].preTax.m = deduction / 12;
        incomeInfo[key].preTax.b = deduction / 26;
        incomeOutput.after.y += preTax;
        incomeOutput.after.m += preTax / 12;
        incomeOutput.after.b += preTax / 26;
        incomeInfo[key].after.y = preTax;
        incomeInfo[key].after.m = preTax / 12;
        incomeInfo[key].after.b = preTax / 26;

        /* SOCIAL SECURITY */
        var socialSecurity = calc.socialSecurity(gross);
        incomeOutput.ss.y += socialSecurity;
        incomeOutput.ss.m += socialSecurity / 12;
        incomeOutput.ss.b += socialSecurity / 26;
        incomeInfo[key].ss.y = socialSecurity;
        incomeInfo[key].ss.m = socialSecurity / 12;
        incomeInfo[key].ss.b = socialSecurity / 26;

        /* MEDICARE */
        var medicare = calc.medicare(gross);
        incomeOutput.med.y += medicare;
        incomeOutput.med.m += medicare / 12;
        incomeOutput.med.b += medicare / 26;
        incomeInfo[key].med.y = medicare;
        incomeInfo[key].med.m = medicare / 12;
        incomeInfo[key].med.b = medicare / 26;

        /* WITHHOLDING*/
        var withholding = calc.withholding(preTax);
        incomeOutput.fed.y += withholding;
        incomeOutput.fed.m += withholding / 12;
        incomeOutput.fed.b += withholding / 26;
        incomeInfo[key].fed.y = withholding;
        incomeInfo[key].fed.m = withholding / 12;
        incomeInfo[key].fed.b = withholding / 26;

        /* STATE TAX */
        var stateTax = calc.stateTax(preTax);
        incomeOutput.state.y += stateTax;
        incomeOutput.state.m += stateTax / 12;
        incomeOutput.state.b += stateTax / 26;
        incomeInfo[key].state.y = stateTax;
        incomeInfo[key].state.m = stateTax / 12;
        incomeInfo[key].state.b = stateTax / 26;

        /* NET INCOME */
        var net = preTax - socialSecurity - medicare - withholding - stateTax;
        incomeOutput.net.y += net;
        incomeOutput.net.m += net / 12;
        incomeOutput.net.b += net / 26;
        incomeInfo[key].net.y = net;
        incomeInfo[key].net.m = net / 12;
        incomeInfo[key].net.b = net / 26;

      });

      incProjectionInfo.biWeeklyNet = incomeOutput.net.b;
      return incomeOutput;

    }

    /* CALCULATES SOCIAL SECURITY FOR USER */
    calc.socialSecurity = function(gross) {
      var ss = gross * .062;
      if (ss > 7347) { return 7347; }
      else { return ss; }
    }

    /* CALCULATES MEDICARE FOR USER */
    calc.medicare = function(gross) {
      return gross * .0145;
    }

    /* CALCULATES STATE TAX FOR USER */
    calc.stateTax = function(preTax) {
      var deduction = 2850;
      var taxable = preTax - deduction;
      if (taxable < 0) { taxable = 0; }
      return taxable * .05;
    }

    /* CALCULATES FEDERAL WITHHOLDING FOR USER */
    calc.withholding = function(preTax) {
      var deduction = 6300;
      var exemption = 4050;
      var taxable = preTax - deduction - exemption;
      if (taxable < 0) { taxable = 0; }
      return calc.federalTaxBracket(taxable);
    }

    /* CALCULATES FEDERAL TAXES FOR USER */
    calc.federalTaxBracket = function(taxable) {
      if (taxable > 418400) { return (taxable - 418400) * .396 + 121505.25; }
      else if (taxable > 416700) { return (taxable - 416700) * .35 + 120910.25; }
      else if (taxable > 191650) { return (taxable - 191650) * .33 + 46643.75; }
      else if (taxable > 91900) { return (taxable - 91900) * .28 + 18713.75; }
      else if (taxable > 37950) { return (taxable - 37950) * .25 + 5226.25; }
      else if (taxable > 9325) { return (taxable - 9325) * .15 + 932.5; }
      else { return taxable * .1; }
    }

  }

);
