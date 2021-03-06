angular.module('budgetApp').controller('loanEditCtrl',

  function($scope, $location, loanSvc, projectionSvc) {

    /* GETS SPECIFIC LOAN ON USER SELECT */
    function getLoan() {
      $scope.specLoan = loanSvc.getLoan();
    }

    getLoan();
    if (!$scope.specLoan.mortgageIns) {
      $('#other-edit-tbl').css('display', 'none');
      $('#income-loans-edit .income-summary').css('justifyContent', 'inherit');
      $('#income-loans-edit .income-summary table').css('marginBottom', '20');
    }

    /* UPDATES LOAN SELECTED BY USER */
    $scope.updateLoan = function(payee, loanAmount, payment, rate, loanType, term, termLength, nextPay) {
      loanSvc.updateLoan($scope.userID, payee, loanAmount, payment, rate, loanType, term, termLength, nextPay).then(function(status) {
        loanSvc.getLoans($scope.userID).then(function(res) {
          $scope.loans = res;
          $scope.loanOutput = loanSvc.calcLoans(res);
          loanSvc.saveLoanInfo(res, $scope.loanOutput);
          loanSvc.setLoan(payee);
          getLoan();

          /* GET LOAN PROJECTION INFO */
          var loanProjInfo = loanSvc.getLoanProjectionInfo();
          $scope.projections.projLoans = projectionSvc.calcLoans(loanProjInfo);
        });
      });
    }

    /* DELETES LOAN SELECTED BY USER */
    $scope.removeLoan = function(payee) {
      loanSvc.removeLoan($scope.userID, payee).then(function(status) {
        loanSvc.getLoans($scope.userID).then(function(res) {
          var loanOutputInfo = loanSvc.calcLoans(res);
          loanSvc.saveLoanInfo(res, loanOutputInfo);

          /* GET LOAN PROJECTION INFO */
          var loanProjInfo = loanSvc.getLoanProjectionInfo();
          $scope.projections.projLoans = projectionSvc.calcLoans(loanProjInfo);

          if (status === 'Removed') {
            $location.path('/home/loans');
          }

        });

      });
    }

  }

);
