angular.module("date.after", [])
.directive('dateAfter', function($timeout) {
    return {
        //priority: 1000, // a low number so this directive loads after all other directives have loaded.
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {

            var date, otherDate;
            scope.$watch(attrs.dateAfter, function(value) {
                otherDate = value;
                validate();
            });
            scope.$watch(attrs.ngModel, function(value) {
                date = value;
                validate();
            });
            function validate() {
                ngModelCtrl.$setValidity('dateAfter', !date || !otherDate || date >= otherDate);
            }
        }
    };
});