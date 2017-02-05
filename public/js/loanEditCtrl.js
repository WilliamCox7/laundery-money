angular.module('budgetApp').controller('loanEditCtrl',

  function($scope, $location, loanSvc) {

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
          loanSvc.setLoan(payee);
          getLoan();
        });
      });
    }

    /* DELETES LOAN SELECTED BY USER */
    $scope.removeLoan = function(payee) {
      loanSvc.removeLoan($scope.userID, payee).then(function(status) {
        if (status === 'Removed') {
          $location.path('/home/loans');
        }
      });
    }

  }

);
