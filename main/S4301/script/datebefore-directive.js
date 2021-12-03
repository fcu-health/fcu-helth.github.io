angular.module("date.before", [])
.directive('dateBefore', function($timeout) {
    return {
        //priority: 1000, // a low number so this directive loads before all other directives have loaded.
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {

            var date, otherDate;
            scope.$watch(attrs.dateBefore, function(value) {
                otherDate = value;
                validate();
            });
            scope.$watch(attrs.ngModel, function(value) {
                date = value;
                validate();
            });
            function validate() {
                ngModelCtrl.$setValidity('dateBefore', !date || !otherDate || date <= otherDate);
            }
        }
    };
});