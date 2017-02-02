angular.module('budgetApp').service('loginSvc',

  function($http) {

    /* LOGS USER IN USING LOCAL STRATEGY */
    this.loginLocal = function(user, pass) {
      return $http({
        method: "POST",
        url: 'auth/local',
        data: { username: user, password: pass }
      }).then(function(res) {
        return res.data;
      });
    }

    /* SIGNS USER UP USING LOCAL STRATEGY */
    this.signUp = function(user, pass, first, last) {
      return $http({
        method: "POST",
        url: 'auth/signup',
        data: { username: user, password: pass, firstName: first, lastName: last }
      }).then(function(res) {
        return res.data;
      });
    }

    /* GETS USER INFO AFTER AUTHORIZATION */
    this.getUserInfo = function() {
      return $http({
        method: 'GET',
        url: '/auth/me'
      })
      .then(function(res) {
        return res.data;
      });
    }

    this.getInitStatus = function(id) {
      return $http({
        method: 'POST',
        url: '/init',
        data: { id: id }
      }).then(function(res) {
        return res.data[0];
      });
    }

    this.getStarted = function(id, balance) {
      $http ({
        method: 'POST',
        url: '/init/getStarted',
        data: { id: id, balance: balance }
      });
    }

  }

);
