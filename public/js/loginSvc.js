angular.module('budgetApp').service('loginSvc', function($http) {
  this.loginLocal = function(user, pass) {
    return $http({
      method: "POST",
      url: 'auth/local',
      data: { username: user, password: pass }
    }).then(function(res) {
      return res.data;
    });
  }
  this.signUp = function(user, pass, first, last) {
    return $http({
      method: "POST",
      url: 'auth/signup',
      data: { username: user, password: pass, firstName: first, lastName: last }
    }).then(function(res) {
      return res.data;
    });
  }
  this.getUserInfo = function() {
    return $http({
      method: 'GET',
      url: '/auth/me'
    })
    .then(function(res) {
      return res.data;
    });
  }
});
