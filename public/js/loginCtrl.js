angular.module('budgetApp').controller('loginCtrl', function($scope, $location, loginSvc) {

  $scope.loginLocal = function(user, pass) {
    if ($scope.buttonText === 'Sign Up') {
      loginSvc.signUp(user, pass).then(function(res) {
        if (res) {
          $location.path('/home');
        }
      });
    } else {
      loginSvc.loginLocal(user, pass).then(function(res) {
        if (res) {
          $location.path('/home');
        }
      });
    }
  }

  $scope.toggleActive = function($event) {
    var element = angular.element($event.currentTarget);
    var sibling = $(element).siblings();
    var subButtonImg = $(element).parent().siblings().children().eq(2).children().eq(0).children().eq(0);
    $scope.buttonText = element[0].innerText;
    if (element[0].innerText === 'Sign Up') {
      $(subButtonImg).attr('src', "../src/start.png");
    } else {
      $(subButtonImg).attr('src', "../src/login.png");
    }
    element.addClass('active');
    sibling.removeClass('active');
  }

});