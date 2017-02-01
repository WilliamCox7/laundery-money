angular.module('budgetApp').controller('expenseCtrl',

  function($scope, expenseSvc) {

    var expenseInfo = [];
    var keywordInfo = [];
    var savedExpenses = [];
    var expIter = 0;
    $scope.exp = { description: null, date: null, amount: null }
    $scope.expCurrent = 1;

    /* THIS BEGINS THE UPLOAD PROCESS FOR USER */
    $scope.saveExpenses = function(arr) {
      savedExpenses = arr;
      $scope.expTotal = arr.length / 5;
      $scope.exp.description = arr[4].replace(/['"]+/g, '');
      $scope.exp.date = new Date(arr[0]);
      $scope.exp.amount = Number(arr[1].replace(/['"]+/g, ''));
      var keyDesc = $scope.exp.description.toLowerCase();
      $scope.userKeywords.forEach(function(keyInfo) {
        if (keyDesc.indexOf(keyInfo.keyword.toLowerCase()) >= 0) {
          $scope.saveUserSelection(keyInfo.category, undefined, keyInfo.subcategory, undefined, undefined, false);
        }
      });
    }

    /* ADDS ALL EXPENSES FROM UPLOAD */
    $scope.addExpenses = function() {
      expenseSvc.addExpenses(expenseInfo);
    }

    /* SAVES ALL KEYWORDS ADDED BY USER FROM UPLOAD */
    $scope.saveKeywords = function() {
      expenseSvc.saveKeywords(keywordInfo);
    }

    /* PROCESSES INFORMATION FROM UPLOAD FORM INTO A NEW EXPENSE */
    $scope.saveUserSelection = function(catSelect, catNew, subSelect, subNew, keyword, checkBool) {
      $scope.expCurrent++;
      var category, subcategory;
      if (catNew !== undefined) { category = catNew; $scope.categories.push(catNew); }
      else { category = catSelect; }
      if (subNew !== undefined) { subcategory = subNew; $scope.subcategories.push(subNew); }
      else { subcategory = subSelect; }
      expenseInfo.push([$scope.userID, category, subcategory, $scope.exp.date, $scope.exp.amount, $scope.exp.description]);
      expIter += 5;
      if (savedExpenses.length <= expIter) {
        expIter = 0;
        $('.form-modal').css('display', 'none');
        if (checkBool) {
          keywordInfo.push([$scope.userID, category, subcategory, keyword]);
          $scope.userKeywords.push({
            id: $scope.userID,
            category: category,
            subcategory: subcategory,
            keyword: keyword
          });
        }
        $scope.addExpenses();
        $scope.saveKeywords();
        $scope.catSelect = undefined;
        $scope.catNew = undefined;
        $scope.subSelect = undefined;
        $scope.subNew = undefined;
        $scope.keyword = undefined;
        $scope.checkBool = false;
        $scope.expCurrent = 1;
      } else {
        $scope.exp.description = savedExpenses[expIter+4].replace(/['"]+/g, '');
        $scope.exp.date = new Date(savedExpenses[expIter]);
        $scope.exp.amount = Number(savedExpenses[expIter+1].replace(/['"]+/g, ''));
        if (checkBool) {
          keywordInfo.push([$scope.userID, category, subcategory, keyword]);
          $scope.userKeywords.push({
            id: $scope.userID,
            category: category,
            subcategory: subcategory,
            keyword: keyword
          });
        }
        $scope.catSelect = undefined;
        $scope.catNew = undefined;
        $scope.subSelect = undefined;
        $scope.subNew = undefined;
        $scope.keyword = undefined;
        $scope.checkBool = false;
        var keyDesc = $scope.exp.description.toLowerCase();
        $scope.userKeywords.forEach(function(keyInfo) {
          if (keyDesc.indexOf(keyInfo.keyword.toLowerCase()) >= 0) {
            $scope.saveUserSelection(keyInfo.category, undefined, keyInfo.subcategory, undefined, undefined, false);
          }
        });
      }
    }

  }

);
