angular.module('budgetApp').controller('expenseEditCtrl',

  function($scope, expenseSvc) {

    /* REMOVES KEYWORD SELECTED IN EXPENSE MANAGER */
    $scope.removeKeyword = function(keyword, index) {
      expenseSvc.removeKeyword($scope.userID, keyword).then(function(status) {
        expenseSvc.getKeywordInfo($scope.userID).then(function(res) {
          $scope.userKeywords = res;
        });
      });
      document.getElementById('exp-manager-tbl').deleteRow(index+1);
    }

  }

);
