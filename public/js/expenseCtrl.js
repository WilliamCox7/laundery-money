angular.module('budgetApp').controller('expenseCtrl',

  function($scope, expenseSvc, projectionSvc) {

    var expenseInfo = [];
    var keywordInfo = [];
    var savedExpenses = [];
    var lastFileName;
    var expIter = 0;
    $scope.exp = { description: null, date: null, amount: null }
    $scope.expCurrent = 1;
    $scope.uploadHistory = expenseSvc.getHistory();

    var savedExpInfo = expenseSvc.getSavedExpenses();
    $scope.categories = savedExpInfo.categories;
    $scope.subcategories = savedExpInfo.subcategories;
    $scope.expense = savedExpInfo.expense;
    $scope.totalExpense = savedExpInfo.totalExpense;

    /* THIS BEGINS THE UPLOAD PROCESS FOR USER */
    $scope.saveExpenses = function(arr, fileName) {

      lastFileName = fileName; //save fileName for future use
      savedExpenses = arr; //saves arr for future use (saveUserSelection function)
      $scope.expTotal = arr.length / 5; //gets how many expenses there are

      $scope.exp.description = arr[4].replace(/['"]+/g, ''); //gets first exp description
      $scope.exp.date = new Date(arr[0]); //gets first exp date
      $scope.exp.amount = Number(arr[1].replace(/['"]+/g, '')); //gets first exp amount

      var keyDesc = $scope.exp.description.toLowerCase(); //creates lowercase string for comparison
      var tempIter = 0; //this is used to skip any 'online payment's

      /* This will loop through and skip any expense that has online payment in it */
      while (keyDesc.indexOf('online payment') >= 0) {
        tempIter += 5; $scope.expCurrent++;
        $scope.exp.description = arr[tempIter+4].replace(/['"]+/g, ''); //gets next exp description
        $scope.exp.date = new Date(arr[tempIter]); //gets next exp date
        $scope.exp.amount = Number(arr[tempIter+1].replace(/['"]+/g, '')); //gets next exp amount
        keyDesc = $scope.exp.description.toLowerCase(); //creates lowercase string for comparison
      }

      /* loops through saved keywords */
      $scope.userKeywords.forEach(function(keyInfo) {
        if (keyDesc.indexOf(keyInfo.keyword.toLowerCase()) >= 0) {
          /* if keyword matches, automatically save it as a 'user selection' */
          $scope.saveUserSelection(keyInfo.category, undefined, keyInfo.subcategory, undefined, undefined, false);
        }
      });

    }

    /* ADDS ALL EXPENSES FROM UPLOAD */
    $scope.addExpenses = function() {
      expenseSvc.addExpenses(expenseInfo).then(function(status) {
        expenseSvc.getExpenses($scope.userID).then(function(res) {
          expenseSvc.saveExpenses(res.categoryNames, res.subcategoryNames, res.categories, res);

          /* GET EXPENSE PROJECTION INFO */
          var expProjInfo = expenseSvc.getExpProjectionInfo();
          $scope.projections.projExps = projectionSvc.calcExpenses(expProjInfo);
        });
      });
    }

    /* SAVES ALL KEYWORDS ADDED BY USER FROM UPLOAD */
    $scope.saveKeywords = function() {
      expenseSvc.saveKeywords(keywordInfo);
    }

    /* PROCESSES INFORMATION FROM UPLOAD FORM INTO A NEW EXPENSE */
    $scope.saveUserSelection = function(catSelect, catNew, subSelect, subNew, keyword, checkBool) {
      $scope.expCurrent++; //incriments the current expense to show on form

      /* finds category/subcategory to push to expenseInfo */
      var category, subcategory;
      if (catNew !== undefined) { category = catNew; $scope.categories.push(catNew); }
      else { category = catSelect; }
      if (subNew !== undefined) { subcategory = subNew; $scope.subcategories.push(subNew); }
      else { subcategory = subSelect; }

      /* save expenses to be added later */
      var keyDesc = $scope.exp.description.toLowerCase(); //creates lowercase string for comparison
      if (keyDesc.indexOf('online payment') < 0) {
        expenseInfo.push([$scope.userID, category, subcategory, $scope.exp.date, $scope.exp.amount, $scope.exp.description]);
      }

      expIter += 5; //once pushed, move on to next set of expense information

      /* if reached all expenses */
      if (savedExpenses.length <= expIter) {
        expIter = 0; //reset
        $('.form-modal').css('display', 'none'); //hide form

        /* if checkbox was checked, save VERY LAST keyword input by user */
        if (checkBool) {
          keywordInfo.push([$scope.userID, category, subcategory, keyword]);
          $scope.userKeywords.push({
            id: $scope.userID,
            category: category,
            subcategory: subcategory,
            keyword: keyword
          });
        }

        /* add expenses and keywords */
        $scope.addExpenses();
        $scope.saveKeywords();

        /* reset information */
        $scope.catSelect = undefined;
        $scope.catNew = undefined;
        $scope.subSelect = undefined;
        $scope.subNew = undefined;
        $scope.keyword = undefined;
        $scope.checkBool = false;
        $scope.expCurrent = 1;

        $scope.uploadHistory = expenseSvc.addToHistory(lastFileName + ' Uploaded');

      } else { //if there are more expenses to loop through

        /* get next set of expense information */
        $scope.exp.description = savedExpenses[expIter+4].replace(/['"]+/g, '');
        $scope.exp.date = new Date(savedExpenses[expIter]);
        $scope.exp.amount = Number(savedExpenses[expIter+1].replace(/['"]+/g, ''));

        keyDesc = $scope.exp.description.toLowerCase(); //creates lowercase string for comparison

        /* This will loop through and skip any expense that has online payment in it */
        while (keyDesc.indexOf('online payment') >= 0) {
          expIter += 5; $scope.expCurrent++;
          $scope.exp.description = savedExpenses[expIter+4].replace(/['"]+/g, ''); //gets next exp description
          $scope.exp.date = new Date(savedExpenses[expIter]); //gets next exp date
          $scope.exp.amount = Number(savedExpenses[expIter+1].replace(/['"]+/g, '')); //gets next exp amount
          keyDesc = $scope.exp.description.toLowerCase(); //creates lowercase string for comparison
        }

        /* if checkbox was checked, save keyword input by user */
        if (checkBool) {
          keywordInfo.push([$scope.userID, category, subcategory, keyword]);
          $scope.userKeywords.push({
            id: $scope.userID,
            category: category,
            subcategory: subcategory,
            keyword: keyword
          });
        }

        /* reset information for next expense */
        $scope.catSelect = undefined;
        $scope.catNew = undefined;
        $scope.subSelect = undefined;
        $scope.subNew = undefined;
        $scope.keyword = undefined;
        $scope.checkBool = false;

        /* check if this expense has a keyword associated with it */
        keyDesc = $scope.exp.description.toLowerCase();
        $scope.userKeywords.forEach(function(keyInfo) {
          /* if there is a keyword associated with it, automatically move forward */
          if (keyDesc.indexOf(keyInfo.keyword.toLowerCase()) >= 0) {
            $scope.saveUserSelection(keyInfo.category, undefined, keyInfo.subcategory, undefined, undefined, false);
          }
        });

      }

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
