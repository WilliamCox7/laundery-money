angular.module('budgetApp').directive('upload', function() {
  return {
    restrict: 'EA',
    link: function(scope, elem, attrs) {
      elem.on("change" ,function(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function(evt) {
          scope.$apply(function($scope) {
            var content = evt.target.result;
            content = content.replace(/['"]+/g, '');
            content = content.replace(/[\n\r]/g, ',');
            var array = content.split(",");
            for (var i = 0; i < array.length; i+=5) {
              
            }
          });
        };
        reader.readAsText(file);
      });
    }
  }
});
