angular.module('budgetApp').controller('projectionCtrl',

  function($scope, incomeSvc, expenseSvc, loanSvc, projectionSvc) {

    $scope.currentYear = new Date().getFullYear();

  }

);
