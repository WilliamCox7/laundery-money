angular.module('budgetApp').controller('incomeEditCtrl', function($scope, $location, calcSvc) {
  function getIncome() {
    $scope.specIncome = calcSvc.getIncome();
  }
  getIncome();
  $scope.updateIncome = function(source, amount, period, next, pattern, days, deduction, percent) {
    calcSvc.updateIncome($scope.userID, source, amount, period, next, pattern, days, deduction, percent).then(function(status) {
      calcSvc.getIncomes($scope.userID).then(function(res) {
        $scope.incomes = res;
        $scope.incomeOutput = calcSvc.calcIncome(res);
        calcSvc.setIncome(source);
        getIncome();
      });
    });
  }
  $scope.removeIncome = function(source) {
    calcSvc.removeIncome($scope.userID, source).then(function(status) {
      if (status === 'Removed') {
        $location.path('/home/income');
      }
    });
  }
});
