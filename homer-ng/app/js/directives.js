/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="homer.ts" />
'use strict';
;

var homerDirectives = angular.module('homerDirectives', []);

homerDirectives.directive('homerlocadirective', function factory($parse) {
    var directiveDefinitionObject = {
        templateUrl: 'partials/address-detail.html',
        link: function postLink($scope, iElement, iAttrs) {
            $scope.$watch(iAttrs.homerlocadirective, function (addr) {
                console.log(iAttrs.homerlocadirective, addr);
                $scope.address = addr;
            });
            iElement.on('click', function () {
                return alert('click');
            });
        }
    };
    return directiveDefinitionObject;
});
//# sourceMappingURL=directives.js.map
