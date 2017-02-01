angular.module('budgetApp').controller('homeCtrl',

  function($scope, $state, loginSvc, incomeSvc, expenseSvc, loanSvc, projectionSvc) {

    $scope.projections = {
      income: {}
    };

    function getUserInfo() {

      loginSvc.getUserInfo().then(function(res) {

        /* GET USER INFO ON LOGIN */
        $scope.userID = res.id;
        if (res.provider) { $scope.username = res.displayName.split(" ")[0]; }
        else { $scope.username = res.first; }

        /* GET INCOMES FOR USER */
        incomeSvc.getIncomes(res.id).then(function(res) {
          $scope.incomes = res;
          $scope.incomeOutput = incomeSvc.calcIncome(res);
          if (res.length > 1) {
            $('.income').css('display', 'block');
            $('.form-modal').css('marginTop', '-984px');
          }

          /* GET INCOME PROJECTION INFO */
          var incProjInfo = incomeSvc.getIncProjectionInfo();
          $scope.projections.income = projectionSvc.calcIncome(incProjInfo.biWeeklyNet, incProjInfo.payDate);

        });

        /* GET EXPENSES FOR USER */
        expenseSvc.getExpenses(res.id).then(function(res) {
          $scope.categories = res.categoryNames;
          $scope.subcategories = res.subcategoryNames;
          $scope.expense = res.categories;
          $scope.totalExpense = res;

          /* GET EXPENSE PROJECTION INFO */
          var expProjInfo = expenseSvc.getExpProjectionInfo();

        });

        /* GET EXPENSE MANAGER INFO FOR USER */
        expenseSvc.getKeywordInfo(res.id).then(function(res) {
          $scope.userKeywords = res;
        });

        /* GET LOAN INFO FOR USER */
        loanSvc.getLoans(res.id).then(function(res) {
          $scope.loans = res;
          $scope.loanOutput = loanSvc.calcLoans(res);
          if (res.length > 1) {
            $('.income').css('display', 'block');
            $('.form-modal').css('marginTop', '-984px');
          }
        });


      });

    }

    /* ON LOGIN, GET ALL NEEDED INFO */
    getUserInfo();

  }

);
