angular.module('budgetApp').filter('makePos', function() {
  return function(n) { return Math.abs(n); }
});
