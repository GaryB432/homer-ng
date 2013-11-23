/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="homer.ts" />

'use strict';

interface Scope extends ng.IScope, Homer.Loca { }

var homerDirectives = angular.module('homerDirectives', []);


homerDirectives.directive('homerlocadirective', function factory() {
    var directiveDefinitionObject = {
        link: function postLink($scope: Scope, iElement: Element, iAttrs: ng.IAttributes) {
            console.log('OMG');
        }
    };
    return directiveDefinitionObject;
});

//homerControllers.directive('homerlocadirective', ['$scope', Directives.HomerLocaDirective]);

//module todos {
//    'use strict';

//    /**
//     * Directive that executes an expression when the element it is applied to loses focus.
//     */
//    export function todoBlur(): ng.IDirective {
//        return {
//            link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
//                element.bind('blur', () => { $scope.$apply(attributes.todoBlur); });
//            }
//        };
//    }
//}