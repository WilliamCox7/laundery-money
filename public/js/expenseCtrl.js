angular.module('budgetApp').controller('expenseCtrl', function($scope, expenseSvc) {
  var getExpenses = function() {
    expenseSvc.getExpenses($scope.userID).then(function(res) {
      $scope.categories = res.categoryNames;
      $scope.expense = res.categories;
      $scope.totalExpense = res;
    });
  }
  getExpenses();
});
