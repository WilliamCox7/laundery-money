angular.module('budgetApp').controller('loginCtrl', function($scope, $location, loginSvc) {

  $scope.loginLocal = function(user, pass) {
    loginSvc.loginLocal(user, pass).then(function(res) {
      if (res) {
        $location.path('/home');
      }
    });
  }

});
