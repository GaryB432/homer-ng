/// <reference path='../../typings/google/angular-1.0.d.ts' />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../services/homer.ts" />

module HomerWeb {
    interface Scope extends ng.IScope, ILoca {
        name: string;
    }

    interface ILinkAttributes extends ng.IAttributes {
        address: string;
        homerLocaDirective: string;
    }

    App.directive('homerLocaDirective', function factory($parse: ng.IParseService, $animate, $timeout: ng.ITimeoutService) {
        var directiveDefinitionObject: ng.IDirective = {
            templateUrl: 'templates/directives/address-detail.html',
            scope: {
                address: '=',
                latLon: '&'
            },
            controller: ($scope: Scope, $element: JQuery, $attrs: ILinkAttributes) => {
                $scope.name = $attrs.address;
            }
        };
        return directiveDefinitionObject;
    });
}