angular.module('budgetApp').controller('loanCtrl',

  function($scope, loanSvc) {

    /* ADDS NEW LOAN FOR USER */
    $scope.addLoan = function(payee, loanAmount, payment, rate, loanType, term, termLength, nextPay) {
      loanSvc.addLoan($scope.userID, payee, loanAmount, payment, rate, loanType, term, termLength, nextPay)
      .then(function(status) {
        loanSvc.getLoans($scope.userID).then(function(res) {
          $scope.loans = res;
          $('.form-modal').css('display', 'none');
          $scope.loanOutput = loanSvc.calcLoans(res);
          if (res.length > 1) {
            $('.income').css('display', 'block');
            $('.form-modal').css('marginTop', '-984px');
          }
          $state.go('home.loanEdit', {payee:payee});
          $scope.selectLoan(payee);
        });
      });
    }

    /* SELECTS LOAN FOR FUTURE USE */
    $scope.selectLoan = function(payee) {
      loanSvc.setLoan(payee);
    }

  }

);
