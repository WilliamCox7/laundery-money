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
    .state('upload', {
      templateUrl: '../partials/upload.html',
      url: '/upload'
    })
    .state('income', {
      templateUrl: '../partials/income.html',
      url: '/income'
    })
    .state('expenses', {
      templateUrl: '../partials/expenses.html',
      url: '/expenses'
    })
    .state('projections', {
      templateUrl: '../partials/projections.html',
      url: '/projections'
    });

});
