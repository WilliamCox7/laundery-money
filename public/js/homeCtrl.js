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
});
