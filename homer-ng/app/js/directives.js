/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="homer.ts" />
'use strict';
;

var homerDirectives = angular.module('homerDirectives', []);

homerDirectives.directive('homerLocaDirective', function factory($parse) {
    var directiveDefinitionObject = {
        templateUrl: 'partials/address-detail.html',
        scope: {
            address: '=address'
        }
    };
    return directiveDefinitionObject;
});
//# sourceMappingURL=directives.js.map
