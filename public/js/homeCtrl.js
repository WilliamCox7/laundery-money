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
          var incOutput = incomeSvc.calcIncome(res);
          incomeSvc.saveIncomeInfo(res, incOutput);

          /* GET INCOME PROJECTION INFO */
          var incProjInfo = incomeSvc.getIncProjectionInfo();
          $scope.projections.income = projectionSvc.calcIncome(incProjInfo);

        });

        /* GET EXPENSES FOR USER */
        expenseSvc.getExpenses(res.id).then(function(res) {
          expenseSvc.saveExpenses(res.categoryNames, res.subcategoryNames, res.categories, res);

          /* GET EXPENSE PROJECTION INFO */
          var expProjInfo = expenseSvc.getExpProjectionInfo();
          $scope.projections.projExps = projectionSvc.calcExpenses(expProjInfo);

        });

        /* GET EXPENSE MANAGER INFO FOR USER */
        expenseSvc.getKeywordInfo(res.id).then(function(res) {
          $scope.userKeywords = res;
        });

        /* GET LOAN INFO FOR USER */
        loanSvc.getLoans(res.id).then(function(res) {
          var loanOutputInfo = loanSvc.calcLoans(res);
          loanSvc.saveLoanInfo(res, loanOutputInfo);

          /* GET LOAN PROJECTION INFO */
          var loanProjInfo = loanSvc.getLoanProjectionInfo();
          $scope.projections.projLoans = projectionSvc.calcLoans(loanProjInfo);

        });

        /* GET LEFT OVER OUTPUT */
        $scope.projections.leftOver = projectionSvc.getLeftOver();


      });

    }

    /* ON LOGIN, GET ALL NEEDED INFO */
    getUserInfo();

  }

);
