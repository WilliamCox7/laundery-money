angular.module('budgetApp').controller('loginCtrl',

  function($scope, $location, loginSvc) {

    /* LOGS IN/SIGNS IN USER USING THE LOCAL STRATEGY */
    $scope.loginLocal = function(user, pass, first, last) {
      if ($scope.buttonText === 'Sign Up') {
        loginSvc.signUp(user, pass, first, last).then(function(res) {
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

    /* TOGGLES SIGN IN/SIGN UP BUTTONS */
    $scope.toggleActive = function($event) {
      var element = angular.element($event.currentTarget);
      var sibling = $(element).siblings();
      var subButtonP = $(element).parent().siblings().children().eq(4).children().eq(0).children().eq(0);
      $scope.buttonText = element[0].innerText;
      if (element[0].innerText === 'Sign Up') {
        $(subButtonP)[0].innerText = 'Start';
        $('.signUpForm').css('display', 'inline-block');
        $('.inputForm').css('width', '167.7');
      } else {
        $(subButtonP)[0].innerText = 'Log In';
        $('.signUpForm').css('display', 'none');
        $('.inputForm').css('width', '100%');
      }
      element.addClass('active');
      sibling.removeClass('active');
    }

    document.getElementById('vid2').addEventListener('loadedmetadata', function() {
      this.currentTime = 6;
    }, false);

    document.getElementById('vid3').addEventListener('loadedmetadata', function() {
      this.currentTime = 1;
    }, false);

  }

);
