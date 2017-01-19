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
    })
    .state('home.upload', {
      templateUrl: '../partials/home.upload.html',
      url: '/upload'
    })
    .state('home.income', {
      templateUrl: '../partials/home.income.html',
      url: '/income',
      controller: 'homeCtrl'
    })
    .state('home.expenses', {
      templateUrl: '../partials/home.expenses.html',
      url: '/expenses'
    })
    .state('home.projections', {
      templateUrl: '../partials/home.projections.html',
      url: '/projections'
    })
    .state('home.options', {
      templateUrl: '../partials/home.options.html',
      url: '/options'
    });

});
