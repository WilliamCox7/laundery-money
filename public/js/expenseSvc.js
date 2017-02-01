angular.module('budgetApp').service('expenseSvc',

  function($http) {

    var calc = this;

    /* SAVES PROJECTION INFO FOR LATER USE */
    var expProjectionInfo = {};
    this.getExpProjectionInfo = function() {
      return expProjectionInfo;
    }

    /* GETS ALL EXPENSES FOR USER */
    this.getExpenses = function(id) {
      return $http ({
        method: 'POST',
        url: 'expense/get',
        data: { id: id }
      }).then(function(res) {
        return calc.categorize(res.data);;
      });
    }

    /* ADDS ALL NEW EXPENSES FROM UPLOAD FOR USER */
    this.addExpenses = function(expenseInfo) {
      $http ({
        method: 'POST',
        url: 'expense/insert',
        data: { info: expenseInfo }
      });
    }

    /* SAVES USER PREFERENCES FOR UPLOAD */
    this.saveKeywords = function(keywordInfo) {
      $http ({
        method: 'POST',
        url: 'expense/keyword',
        data: { info: keywordInfo }
      });
    }

    /* GETS USER PREFERENCES FOR UPLOAD */
    this.getKeywordInfo = function(id) {
      return $http ({
        method: 'POST',
        url: 'expense/getKeywords',
        data: { id: id }
      }).then(function(res) {
        return res.data;
      });
    }

    /* DELETES USER PREFERENCE FOR UPLOAD */
    this.removeKeyword = function(id, keyword) {
      return $http ({
        method: 'POST',
        url: 'expense/removeKeyword',
        data: { id: id, keyword: keyword }
      }).then(function(res) {
        return res.data;
      });
    }

    /* ORGANIZES EXPENSE DATA FOR USER FOR LATER USE */
    this.categorize = function(data) {

      var expenses = {
        categoryNames: [],
        subcategoryNames: [],
        categories: {},
        total: 0,
        d: 0,
        m: 0,
        y: 0
      };

      var maxDate, minDate;
      var today = new Date();
      var firstTime = true;

      data.forEach(function(expense) {

        var key = expense.category.split(" ").join("");
        var subKey = expense.subcategory.split(" ").join("");

        if (!expenses.categories.hasOwnProperty(key)) {
          expenses.categories[key] = {
            subcategoryNames: [],
            name: expense.category,
            total: 0,
            habit: 0,
            d: 0,
            m: 0,
            y: 0,
            sub: {}
          }

          expProjectionInfo[key] = {
            0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
            6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0,
            projection: 0
          }

          expenses.categoryNames.push(key);

        }

        if (!expenses.categories[key].sub.hasOwnProperty(subKey)) {
          expenses.categories[key].sub[subKey] = {
            name: expense.subcategory,
            total: 0,
            habit: 0,
            d: 0,
            m: 0,
            y: 0
          }
          expenses.categories[key].subcategoryNames.push(subKey);
          expenses.subcategoryNames.push(subKey);
        }

        var expDate = new Date(expense.date);
        expProjectionInfo[key][expDate.getMonth()] += expense.amount;
        expenses.categories[key].total += expense.amount;
        expenses.categories[key].sub[subKey].total += expense.amount;
        expenses.total += expense.amount;
        expenses.categories[key].habit = (expenses.categories[key].total / expenses.total) * 100;
        expenses.categories[key].sub[subKey].habit = (expenses.categories[key].sub[subKey].total / expenses.categories[key].total) * 100;

        if (maxDate && minDate) {
          var nDate = new Date(expense.date);
          if (maxDate - nDate < 0) { maxDate = nDate; }
          if (nDate - minDate < 0) { minDate = nDate; }
        } else {
          maxDate = new Date(expense.date);
          minDate = new Date(expense.date);
        }

        if (firstTime) {
          var totalDays = 1;
          expenses.categories[key].d = expenses.categories[key].total / totalDays;
          expenses.categories[key].sub[subKey].d = expenses.categories[key].sub[subKey].total / totalDays;
          firstTime = false;
        } else {
          var totalDays = (maxDate - minDate) / (1000*60*60*24);
          expenses.categories[key].d = expenses.categories[key].total / totalDays;
          expenses.categories[key].sub[subKey].d = expenses.categories[key].sub[subKey].total / totalDays;
        }

        expenses.categories[key].m = (expenses.categories[key].d * 365) / 12;
        expenses.categories[key].sub[subKey].m = (expenses.categories[key].sub[subKey].d * 365) / 12;
        expenses.categories[key].y = expenses.categories[key].d * 365;
        expenses.categories[key].sub[subKey].y = expenses.categories[key].sub[subKey].d * 365;
        expProjectionInfo[key].projection = expenses.categories[key].m;

      });

      for (var prop in expenses.categories) {
        if (prop === expenses.categoryNames[0]) {
          expenses.categories[prop].habit = (expenses.categories[prop].total / expenses.total) * 100;
        }
        expenses.d += expenses.categories[prop].d;
        expenses.m += expenses.categories[prop].m;
        expenses.y += expenses.categories[prop].y;
        expenses.categories[prop].sub[expenses.categories[prop].subcategoryNames[0]].habit = (expenses.categories[prop].sub[expenses.categories[prop].subcategoryNames[0]].total / expenses.categories[prop].total) * 100;
      }

      return expenses;

    }

  }

);
