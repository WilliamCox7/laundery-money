angular.module('budgetApp').controller('incomeCtrl',

  function($scope, $state, incomeSvc, projectionSvc) {

    $scope.incomes = incomeSvc.getSavedIncomes();
    $scope.incomeOutput = incomeSvc.getSavedOuput();
    if ($scope.incomes.length > 1) {
      $('#income-income').css('display', 'block');
      $('.form-modal').css('marginTop', '-984px');
    }

    /* OPENS FORM FOR NEW INCOME */
    $scope.openModal = function() {
      $('.form-modal').css('display', 'block');
    }

    /* CLOSES FORM FOR NEW INCOME */
    $scope.closeModal = function($event) {
      var element = angular.element($event.target);
      var className = element[0].className;
      if (className.indexOf('form-modal') >= 0 || className === 'close') {
        $('.form-modal').css('display', 'none');
      }
    }

    /* TOGGLES INPUT FOR CERTAIN DAYS */
    $scope.toggleCertainDays = function(item) {
      if (item === 'days') {
        $('#certainDaysInput').css('display', 'inline-block');
        $('#certainDaysSelect').addClass('medium-input');
      } else {
        $('#certainDaysInput').css('display', 'none');
        $('#certainDaysSelect').removeClass('medium-input');
      }
    }

    /* ADDS NEW INCOME INPUT INTO FORM */
    $scope.addIncome = function(source, amount, period, next, pattern, days, deduction, percent) {
      incomeSvc.addIncome($scope.userID, source, amount, period, next, pattern, days, deduction, percent)
      .then(function(status) {

        incomeSvc.getIncomes($scope.userID).then(function(res) {

          $scope.incomes = res;
          $('.form-modal').css('display', 'none');
          $scope.incomeOutput = incomeSvc.calcIncome(res);
          incomeSvc.saveIncomeInfo($scope.incomes, $scope.incomeOutput);

          if (res.length > 1) {
            $('.income').css('display', 'block');
            $('.form-modal').css('marginTop', '-984px');
          }

          /* GET INCOME PROJECTION INFO */
          var incProjInfo = incomeSvc.getIncProjectionInfo();
          $scope.projections.income = projectionSvc.calcIncome(incProjInfo);

          $state.go('home.incomeEdit', {source:source});
          $scope.selectIncome(source);

        });

      });

    }

    /* SETS THE SELECTED INCOME FOR FUTURE USE */
    $scope.selectIncome = function(source) {
      incomeSvc.setIncome(source);
    }

  }

);
