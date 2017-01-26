angular.module('budgetApp').controller('expenseCtrl', function($scope, expenseSvc) {
  var getExpenses = function() {
    expenseSvc.getExpenses($scope.userID).then(function(res) {
      console.log(res);
    });
  }
  getExpenses();
});
