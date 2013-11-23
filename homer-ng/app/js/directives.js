'use strict';
var homerDirectives = angular.module('homerDirectives', []);

homerDirectives.directive('homerlocadirective', function factory() {
    var directiveDefinitionObject = {
        link: function postLink($scope, iElement, iAttrs) {
            console.log('OMG');
        }
    };
    return directiveDefinitionObject;
});
//# sourceMappingURL=directives.js.map
