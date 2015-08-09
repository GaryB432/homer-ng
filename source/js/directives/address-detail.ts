namespace HomerWeb {
    interface Scope extends ng.IScope, ILoca {
        name: string;
    }

    interface ILinkAttributes extends ng.IAttributes {
        address: string;
        homerLocaDirective: string;
    }

    App.directive('homerLocaDirective', function factory($parse: ng.IParseService, $animate: ng.IAnimateService, $timeout: ng.ITimeoutService) {
        var directiveDefinitionObject: ng.IDirective = {
            templateUrl: 'templates/directives/address-detail.html',
            scope: {
                address: '=',
                latLon: '&'
            },
            controller: ($scope: Scope, $element: JQuery, $attrs: ILinkAttributes) => {
                //$element.css({
                //    position: 'relative',
                //    border: '1px solid red',
                //    backgroundColor: 'lightgrey',
                //    cursor: 'pointer'
                //});
                $scope.name = $attrs.address;
            }
        };
        return directiveDefinitionObject;
    });
}
