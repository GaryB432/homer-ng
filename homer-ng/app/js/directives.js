var HomerWeb;
(function (HomerWeb) {
    'use strict';

    ;

    var homerDirectives = angular.module('homerDirectives', []);

    homerDirectives.directive('homerLocaDirective', function factory($parse, $animate) {
        var directiveDefinitionObject = {
            templateUrl: 'partials/address-detail.html',
            scope: {
                address: '='
            },
            controller: function ($scope, $element, $attrs) {
                $scope.onChange = function (loca) {
                    if (!!loca) {
                        console.log('changed', loca, $element);
                        $animate.removeClass($element, 'homerfun', function () {
                            return $animate.addClass($element, 'homerfun');
                        });
                    }
                };
            },
            link: function (scope, elem, a) {
                scope.$watch('address', function (newVal) {
                    return scope.onChange(newVal);
                });
            }
        };
        return directiveDefinitionObject;
    });
})(HomerWeb || (HomerWeb = {}));
//# sourceMappingURL=directives.js.map
