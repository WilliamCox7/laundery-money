angular.module('budgetApp').service('expenseSvc', function($http) {
  this.getExpenses = function(id) {
    return $http ({
      method: 'POST',
      url: 'expense/get',
      data: { id: id }
    }).then(function(res) {
      return res.data;
    });
  }
});
