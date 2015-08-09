namespace HomerWeb {
    interface Scope extends ng.IScope, ILoca {
        name: string;
    }

    interface ILinkAttributes extends ng.IAttributes {
        address: string;
        homerLocaDirective: string;
    }

    App.directive('homerLocaDirective', function factory($animate: ng.IAnimateService) {
        let directiveDefinitionObject: ng.IDirective = {
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
