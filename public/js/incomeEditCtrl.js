angular.module('budgetApp').controller('incomeEditCtrl',

  function($scope, $location, incomeSvc) {

    /* GETS THE SPECIFIC INCOME SELECTED BY THE USER */
    function getIncome() {
      $scope.specIncome = incomeSvc.getIncome();
    }

    getIncome();

    /* UPDATES THE INCOME SELECTED BY THE USER */
    $scope.updateIncome = function(source, amount, period, next, pattern, days, deduction, percent) {
      incomeSvc.updateIncome($scope.userID, source, amount, period, next, pattern, days, deduction, percent).then(function(status) {
        incomeSvc.getIncomes($scope.userID).then(function(res) {
          $scope.incomes = res;
          $scope.incomeOutput = incomeSvc.calcIncome(res);
          incomeSvc.setIncome(source);
          getIncome();
        });
      });
    }

    /* DELETES INCOME SELECTED BY THE USER */
    $scope.removeIncome = function(source) {
      incomeSvc.removeIncome($scope.userID, source).then(function(status) {
        if (status === 'Income Removed') { $location.path('/home/income'); }
      });
    }

  }

);
