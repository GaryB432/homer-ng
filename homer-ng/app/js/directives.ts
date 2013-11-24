/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="homer.ts" />

module HomerWeb {

    'use strict';

    interface Scope extends ng.IScope, Homer.Loca {
        onChange(loca: Homer.Loca): void;
    }

    interface ILinkAttributes extends ng.IAttributes {
        homerLocaDirective: string;
    };

    var homerDirectives = angular.module('homerDirectives', []);

    homerDirectives.directive('homerLocaDirective', function factory($parse: ng.IParseService, $animate) {
        var directiveDefinitionObject: ng.IDirective = {
            templateUrl: 'partials/address-detail.html',
            scope: {
                address: '='
            },
            controller: ($scope: Scope, $element: JQuery, $attrs: ng.IAttributes) => {
                $scope.onChange = (loca) => {
                    if (!!loca) {
                        console.log('changed', loca, $element);
                        $animate.removeClass($element, 'homerfun', () => $animate.addClass($element, 'homerfun'));
                        //$element.removeClass('homerfun').addClass('homerfun');
                    }
                };
            },
            link: (scope: Scope, elem: JQuery, a: ng.IAttributes) => {
                scope.$watch('address', (newVal) => scope.onChange(newVal));
            }
        };
        return directiveDefinitionObject;
    });
}