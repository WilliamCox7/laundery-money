angular.module('budgetApp').service('projectionSvc', function($http) {
  this.calcIncome = function(biWeeklyNet, payDate) {
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
      if (d.getMonth() === 0) { income.January += biWeeklyNet; }
      else if (d.getMonth() === 1) { income.February += biWeeklyNet; }
      else if (d.getMonth() === 2) { income.March += biWeeklyNet; }
      else if (d.getMonth() === 3) { income.April += biWeeklyNet; }
      else if (d.getMonth() === 4) { income.May += biWeeklyNet; }
      else if (d.getMonth() === 5) { income.June += biWeeklyNet; }
      else if (d.getMonth() === 6) { income.July += biWeeklyNet; }
      else if (d.getMonth() === 7) { income.August += biWeeklyNet; }
      else if (d.getMonth() === 8) { income.September += biWeeklyNet; }
      else if (d.getMonth() === 9) { income.October += biWeeklyNet; }
      else if (d.getMonth() === 10) { income.November += biWeeklyNet; }
      else if (d.getMonth() === 11) { income.December += biWeeklyNet; }
      payDate += 14;
    }
    return income;
  }
});
