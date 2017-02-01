angular.module('budgetApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('home', {
      templateUrl: '../partials/home.html',
      url: '/home',
      controller: 'homeCtrl'
    })
    .state('login', {
      templateUrl: '../partials/login.html',
      url: '/login',
      controller: 'loginCtrl'
    })
    .state('home.upload', {
      templateUrl: '../partials/home.upload.html',
      url: '/upload',
      controller: 'expenseCtrl'
    })
    .state('home.income', {
      templateUrl: '../partials/home.income.html',
      url: '/income',
      controller: 'incomeCtrl'
    })
    .state('home.expenses', {
      templateUrl: '../partials/home.expenses.html',
      url: '/expenses',
      controller: 'expenseCtrl'
    })
    .state('home.expenseEdit', {
      templateUrl: '../partials/home.expenseEdit.html',
      url: '/expenses/expense_manager',
      controller: 'expenseEditCtrl'
    })
    .state('home.loans', {
      templateUrl: '../partials/home.loans.html',
      url: '/loans',
      controller: 'loanCtrl'
    })
    .state('home.loanEdit', {
      templateUrl: '../partials/home.loanEdit.html',
      url: '/loans/:payee',
      controller: 'loanEditCtrl'
    })
    .state('home.projections', {
      templateUrl: '../partials/home.projections.html',
      url: '/projections',
      controller: 'projectionCtrl'
    })
    .state('home.options', {
      templateUrl: '../partials/home.options.html',
      url: '/options'
    })
    .state('home.incomeEdit', {
      templateUrl: '../partials/home.incomeEdit.html',
      url: '/income/:source',
      controller: 'incomeEditCtrl'
    });

});
