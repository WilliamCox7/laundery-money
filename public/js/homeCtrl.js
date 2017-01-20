angular.module('budgetApp').controller('homeCtrl', function($scope) {
  $scope.openModal = function() {
    $('.form-modal').css('display', 'block');
  }
  $scope.closeModal = function($event) {
    var element = angular.element($event.target);
    if (element[0].className === 'form-modal' || element[0].className === 'close') {
      $('.form-modal').css('display', 'none');
    }
  }
  $scope.toggleCertainDays = function(item) {
    if (item === 'days') {
      $('#certainDaysInput').css('display', 'inline-block');
      $('#certainDaysSelect').addClass('medium-input');
    } else {
      $('#certainDaysInput').css('display', 'none');
      $('#certainDaysSelect').removeClass('medium-input');
    }
  }
});
