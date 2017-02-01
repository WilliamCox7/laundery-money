angular.module('budgetApp').service('projectionSvc',

  function($http) {

    this.calcIncome = function(biWeeklyNet, payDate) {
    
      var firstPayDate = payDate;
      var income = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0
      }
      var thisYear = new Date().getFullYear();
      var beginning = new Date(thisYear, "0", "1");
      beginning = Number(beginning) / (1000*60*60*24);
      var end = new Date(thisYear, "11", "31");
      end = Number(end) / (1000*60*60*24);
      payDate = Number(payDate) / (1000*60*60*24);
      if (payDate < beginning) {
        while (payDate < beginning) { payDate += 14; }
      } else {
        while (payDate > beginning) { payDate -= 14; }
        payDate += 14;
      }
      while (payDate < end) {
        var d =  new Date(payDate * (1000*60*60*24));
        if (d.getMonth() === 0 && d >= firstPayDate) { income.January += biWeeklyNet; }
        else if (d.getMonth() === 1 && d >= firstPayDate) { income.February += biWeeklyNet; }
        else if (d.getMonth() === 2 && d >= firstPayDate) { income.March += biWeeklyNet; }
        else if (d.getMonth() === 3 && d >= firstPayDate) { income.April += biWeeklyNet; }
        else if (d.getMonth() === 4 && d >= firstPayDate) { income.May += biWeeklyNet; }
        else if (d.getMonth() === 5 && d >= firstPayDate) { income.June += biWeeklyNet; }
        else if (d.getMonth() === 6 && d >= firstPayDate) { income.July += biWeeklyNet; }
        else if (d.getMonth() === 7 && d >= firstPayDate) { income.August += biWeeklyNet; }
        else if (d.getMonth() === 8 && d >= firstPayDate) { income.September += biWeeklyNet; }
        else if (d.getMonth() === 9 && d >= firstPayDate) { income.October += biWeeklyNet; }
        else if (d.getMonth() === 10 && d >= firstPayDate) { income.November += biWeeklyNet; }
        else if (d.getMonth() === 11 && d >= firstPayDate) { income.December += biWeeklyNet; }
        payDate += 14;
      }
      return income;
    }

  }

);
