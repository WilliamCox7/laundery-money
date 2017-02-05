angular.module('budgetApp').controller('incomeEditCtrl',

  function($scope, $location, incomeSvc, projectionSvc) {

    /* GETS THE SPECIFIC INCOME SELECTED BY THE USER */
    function getIncome() {
      $scope.specIncome = incomeSvc.getIncome();
    }

    getIncome();
    if ($scope.specIncome.preTax.b === 0) {
      $('#preTax-edit-tbl').css('display', 'none');
      $('.income .income-summary').css('justifyContent', 'inherit');
      $('.income .income-summary table').css('marginBottom', '20');
    }

    /* UPDATES THE INCOME SELECTED BY THE USER */
    $scope.updateIncome = function(source, amount, period, next, pattern, days, deduction, percent) {
      incomeSvc.updateIncome($scope.userID, source, amount, period, next, pattern, days, deduction, percent).then(function(status) {
        incomeSvc.getIncomes($scope.userID).then(function(res) {
          $scope.incomes = res;
          $scope.incomeOutput = incomeSvc.calcIncome(res);
          incomeSvc.saveIncomeInfo(res, $scope.incomeOutput);
          incomeSvc.setIncome(source);
          getIncome();

          /* GET INCOME PROJECTION INFO */
          var incProjInfo = incomeSvc.getIncProjectionInfo();
          $scope.projections.income = projectionSvc.calcIncome(incProjInfo);
        });
      });
    }

    /* DELETES INCOME SELECTED BY THE USER */
    $scope.removeIncome = function(source) {
      incomeSvc.removeIncome($scope.userID, source).then(function(status) {
        incomeSvc.getIncomes($scope.userID).then(function(res) {
          var incOutput = incomeSvc.calcIncome(res);
          incomeSvc.saveIncomeInfo(res, incOutput);

          /* GET INCOME PROJECTION INFO */
          var incProjInfo = incomeSvc.getIncProjectionInfo();
          $scope.projections.income = projectionSvc.calcIncome(incProjInfo);
          if (status === 'Income Removed') { $location.path('/home/income'); }
        });

      });
    }

  }

);
