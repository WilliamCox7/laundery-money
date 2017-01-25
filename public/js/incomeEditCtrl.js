angular.module('budgetApp').controller('incomeEditCtrl', function($scope, calcSvc) {
  function getIncome() {
    $scope.specIncome = calcSvc.getIncome();
  }
  getIncome();
  $scope.updateIncome = function(source, amount, period, next, pattern, days, deduction, percent) {
    calcSvc.updateIncome($scope.userID, source, amount, period, next, pattern, days, deduction, percent).then(function(res) {
      $scope.incomes = res;
      $scope.incomeOutput = calcSvc.calcIncome(res);
      calcSvc.setIncome(source);
      getIncome();
    });
  }
});
