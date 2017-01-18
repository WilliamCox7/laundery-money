angular.module('budgetApp').controller('loginCtrl', function($scope, $location, loginSvc) {

  $scope.loginLocal = function(user, pass) {
    if ($scope.buttonText === 'Sign Up') {
      loginSvc.signUp(user, pass).then(function(res) {
        if (res) {
          $location.path('/home/options');
        }
      });
    } else {
      loginSvc.loginLocal(user, pass).then(function(res) {
        if (res) {
          $location.path('/home/options');
        }
      });
    }
  }

  $scope.toggleActive = function($event) {
    var element = angular.element($event.currentTarget);
    var sibling = $(element).siblings();
    var subButtonP = $(element).parent().siblings().children().eq(2).children().eq(0).children().eq(0);
    $scope.buttonText = element[0].innerText;
    if (element[0].innerText === 'Sign Up') {
      $(subButtonP)[0].innerText = 'Start';
    } else {
      $(subButtonP)[0].innerText = 'Log In';
    }
    element.addClass('active');
    sibling.removeClass('active');
  }

});
