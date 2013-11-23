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
        link: function postLink($scope: Scope, iElement: JQuery, iAttrs: ILinkAttributes) {
            $scope.$watch(iAttrs.homerlocadirective, (addr) => {
                console.log(iAttrs.homerlocadirective, addr);
                $scope.address = addr;
            });
            iElement.on('click', () => alert('click'));
        }
    };
    return directiveDefinitionObject;
});
