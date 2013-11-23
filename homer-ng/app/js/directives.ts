/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="homer.ts" />

'use strict';

interface Scope extends ng.IScope, Homer.Loca { }

interface ILinkAttributes extends ng.IAttributes {
    homerlocadirective: string;
};

var homerDirectives = angular.module('homerDirectives', []);

homerDirectives.directive('homerlocadirective', function factory($parse: ng.IParseService) {
    var directiveDefinitionObject: ng.IDirective = {
        templateUrl: 'partials/address-detail.html',
        restrict: 'E',
        scope: {
            address: '='
        },
    };
    return directiveDefinitionObject;
});
