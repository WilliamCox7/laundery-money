angular.module('budgetApp').controller('projectionCtrl',

  function($scope, incomeSvc, expenseSvc, loanSvc, projectionSvc) {

    $scope.currentYear = new Date().getFullYear();
    var projInfo = projectionSvc.getProjInfo();
    $scope.projections.income = projInfo.income;
    $scope.projections.projExps = projInfo.expenses;
    $scope.projections.projLoans = projInfo.loans;
    $scope.projections.leftOver = projectionSvc.calcLeftOverAgain($scope.projections.income, $scope.projections.projExps, $scope.projections.projLoans);

  }

);
