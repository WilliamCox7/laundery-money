angular.module('budgetApp').controller('homeCtrl', function($scope, loginSvc, calcSvc) {
  $scope.openModal = function() {
    $('.form-modal').css('display', 'block');
  }
  $scope.closeModal = function($event) {
    var element = angular.element($event.target);
    if (element[0].className === 'form-modal' || element[0].className === 'close') {
      $('.form-modal').css('display', 'none');
    }
  }
  $scope.toggleCertainDays = function(item) {
    if (item === 'days') {
      $('#certainDaysInput').css('display', 'inline-block');
      $('#certainDaysSelect').addClass('medium-input');
    } else {
      $('#certainDaysInput').css('display', 'none');
      $('#certainDaysSelect').removeClass('medium-input');
    }
  }
  function getUserInfo() {
    loginSvc.getUserInfo().then(function(res) {
      $scope.userID = res.id;
      if (res.provider) {
        $scope.username = res.displayName.split(" ")[0];
      } else {
        $scope.username = res.first;
      }
      calcSvc.getIncomes(res.id).then(function(res) {
        $scope.incomes = res;
        $scope.incomeOutput = calcSvc.calcIncome(res);
        if (res.length > 1) {
          $('.income').css('display', 'block');
        }
      });
    });
  }
  getUserInfo();
  $scope.addIncome = function(source, amount, period, next, pattern, days, deduction, percent) {
    calcSvc.addIncome($scope.userID, source, amount, period, next, pattern, days, deduction, percent)
    .then(function(res) {
      $scope.incomes = res;
      $('.form-modal').css('display', 'none');
      $scope.incomeOutput = calcSvc.calcIncome(res);
      if (res.length > 1) {
        $('.income').css('display', 'block');
      }
    });
  }
});
