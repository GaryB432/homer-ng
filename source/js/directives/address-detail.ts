/// <reference path='../../typings/google/angular-1.0.d.ts' />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../services/homer.ts" />

module HomerWeb {
    interface Scope extends ng.IScope, ILoca {
        doStuff(): void;
        onChange(loca: ILoca): void;
    }

    interface ILinkAttributes extends ng.IAttributes {
        homerLocaDirective: string;
    }

    App.directive('homerLocaDirective', function factory($parse: ng.IParseService, $animate) {
        var directiveDefinitionObject: ng.IDirective = {
            templateUrl: 'templates/directives/address-detail.html',
            scope: {
                address: '='
            },
            controller: ($scope: Scope, $element: JQuery, $attrs: ng.IAttributes) => {
                $scope.doStuff = () => {
                    alert('don\'t swipe that!');
                };
                $scope.onChange = (loca) => {
                    if (!!loca) {
                        $animate.removeClass($element, 'homerfun', () => $animate.addClass($element, 'homerfun'));
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