angular.module('budgetApp').controller('loanCtrl',

  function($scope, $state, loanSvc, projectionSvc) {

    $scope.loans = loanSvc.getSavedLoans();
    $scope.loanOutput = loanSvc.getSavedOuput();
    if ($scope.loans.length > 1) {
      $('#income-loans').css('display', 'block');
      $('.form-modal').css('marginTop', '-984px');
    }

    /* OPENS FORM FOR NEW LOAN */
    $scope.openModal = function() {
      $('.form-modal').css('display', 'block');
    }

    /* CLOSES FORM FOR NEW LOAN */
    $scope.closeModal = function($event) {
      var element = angular.element($event.target);
      var className = element[0].className;
      if (className.indexOf('form-modal') >= 0 || className === 'close') {
        $('.form-modal').css('display', 'none');
      }
    }

    /* ADDS NEW LOAN FOR USER */
    $scope.addLoan = function(payee, loanAmount, payment, rate, loanType, term, termLength, nextPay) {
      loanSvc.addLoan($scope.userID, payee, loanAmount, payment, rate, loanType, term, termLength, nextPay)
      .then(function(status) {

        loanSvc.getLoans($scope.userID).then(function(res) {

          $scope.loans = res;
          $('.form-modal').css('display', 'none');
          $scope.loanOutput = loanSvc.calcLoans(res);
          loanSvc.saveLoanInfo($scope.loans, $scope.loanOutput);

          if (res.length > 1) {
            $('.income').css('display', 'block');
            $('.form-modal').css('marginTop', '-984px');
          }

          /* GET LOAN PROJECTION INFO */
          var loanProjInfo = loanSvc.getLoanProjectionInfo();
          $scope.projections.projLoans = projectionSvc.calcLoans(loanProjInfo);

          $state.go('home.loanEdit', {payee:payee});
          $scope.selectLoan(payee);
        });
      });
    }

    /* SELECTS LOAN FOR FUTURE USE */
    $scope.selectLoan = function(payee) {
      loanSvc.setLoan(payee);
    }

    $scope.hoverVideo = function($event) {
      var video = angular.element($event.currentTarget).children().eq(1);
      $(video).get(0).play();
    }

    $scope.hideVideo = function($event) {
      var video = angular.element($event.currentTarget).children().eq(1);
      $(video).get(0).pause();
    }

  }

);
