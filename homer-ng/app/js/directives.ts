/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="homer.ts" />

module HomerWeb {

    'use strict';

    interface Scope extends ng.IScope, Homer.Loca { }

    interface ILinkAttributes extends ng.IAttributes {
        homerLocaDirective: string;
    };

    var homerDirectives = angular.module('homerDirectives', []);

    homerDirectives.directive('homerLocaDirective', function factory($parse: ng.IParseService) {
        var directiveDefinitionObject: ng.IDirective = {
            templateUrl: 'partials/address-detail.html',
            scope: {
                address: '=address'
            },
        };
        return directiveDefinitionObject;
    });
}