angular.module('budgetApp').directive('upload', function($http) {
  return {
    restrict: 'EA',
    link: function(scope, elem, attrs) {
      elem.on("change" ,function(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        $('.form-modal').css('display', 'block');
        reader.onload = function(evt) {
          scope.$apply(function($scope) {
            var content = evt.target.result;
            content = content.replace(/[\n\r]/g, ',');
            var array = content.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            array = array || [];
            scope.saveExpenses(array);
          });
        };
        reader.readAsText(file);
      });
    }
  }
});
