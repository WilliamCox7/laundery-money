angular.module('budgetApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('home', {
      templateUrl: '../partials/home.html',
      url: '/home'
    })
    .state('login', {
      templateUrl: '../partials/login.html',
      url: '/login',
      controller: 'loginCtrl'
    });

});
