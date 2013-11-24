/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="homer.ts" />
var HomerWeb;
(function (HomerWeb) {
    'use strict';

    ;

    var homerDirectives = angular.module('homerDirectives', []);

    homerDirectives.directive('homerLocaDirective', function factory($parse) {
        var directiveDefinitionObject = {
            templateUrl: 'partials/address-detail.html',
            scope: {
                address: '='
            },
            controller: function ($scope, $element, $attrs) {
                $scope.onChange = function (loca) {
                    if (!!loca) {
                        console.log('changed', loca, $element);
                        $element.removeClass('homerfun').addClass('homerfun');
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
