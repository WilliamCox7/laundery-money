angular.module('budgetApp').directive('upload', function($http) {
  return {
    restrict: 'EA',
    link: function(scope, elem, attrs) {
      elem.on("change" ,function(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function(evt) {
          scope.$apply(function($scope) {
            var content = evt.target.result;
            content = content.replace(/[\n\r]/g, ',');
            var array = content.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            array = array || [];
            var expenseInfo = [];
            for (var i = 0; i < array.length; i+=5) {
              var date = new Date(array[i]);
              var amount = Number(array[i+1].replace(/['"]+/g, ''));
              var description = array[i+4].replace(/['"]+/g, '');
              var categ = "test";
              var subC = "subTest";
              expenseInfo.push([scope.userID, categ, subC, date, amount, description]);
            }
            $http ({
              method: 'POST',
              url: 'expense/insert',
              data: { info: expenseInfo }
            }).then(function(res) {
              //console.log(res.data);
            });
          });
        };
        reader.readAsText(file);
      });
    }
  }
});
