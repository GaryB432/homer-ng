namespace HomerWeb {
    interface Scope extends ng.IScope, ILocation {
        name: string;
    }

    interface ILinkAttributes extends ng.IAttributes {
        address: string;
        homerLocaDirective: string;
    }

    App.directive('homerLocation', function factory($animate: ng.IAnimateService) {
        let directiveDefinitionObject: ng.IDirective = {
            templateUrl: 'templates/directives/location.html',
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
