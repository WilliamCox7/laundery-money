angular.module('budgetApp').controller('projectionCtrl', function($scope, calcSvc, expenseSvc, loanSvc, projectionSvc) {
  $scope.currentYear = new Date().getFullYear();
  $scope.projections = {
    income: {},
    leftOver: {}
  };
  function getProjectionInfo() {
    var projectionInfo = calcSvc.getProjectionInfo();
    $scope.projections.income = projectionSvc.calcIncome(projectionInfo.biWeeklyNet, projectionInfo.payDate);
  }
  getProjectionInfo();
});
