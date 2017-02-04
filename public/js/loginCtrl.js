angular.module('budgetApp').controller('loginCtrl',

  function($scope, $location, loginSvc) {

    /* LOGS IN/SIGNS IN USER USING THE LOCAL STRATEGY */
    $scope.loginLocal = function(user, pass, first, last) {

      // $('#a1vid').addEventListener('ended', function(e) {
      //
      // }, false);
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

    $scope.hoverVideo = function($event) {
      var video = angular.element($event.currentTarget).children().eq(1);
      $(video).get(0).play();
    }

    $scope.hideVideo = function($event) {
      var video = angular.element($event.currentTarget).children().eq(1);
      $(video).get(0).pause();
    }

    $scope.haveAnAOneDay = function($event, user, pass, first, last) {
      $('.welcome').css('display', 'none');
      $('.goodbye').css('display', 'flex');
      $('#a1vid').get(0).play();
      var action = angular.element($event.currentTarget)[0].outerText;
      var time = 2000;
      if (action.indexOf('Fb') >= 0) { time = 1800; }
      else if (action.indexOf('G+') >= 0) { time = 1600; }
      setTimeout(function() {
        if (action.indexOf('Fb') >= 0) {
          window.location.href = '/auth/fb';
        } else if (action.indexOf('G+') >= 0) {
          window.location.href = '/auth/google';
        } else {
          $scope.loginLocal(user, pass, first, last);
        }
      }, time);
    }

  }

);
