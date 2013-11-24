/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="homer.ts" />
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
                $scope.doStuff = function () {
                    return alert('don\'t click that');
                };
                $scope.onChange = function (loca) {
                    if (!!loca) {
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
