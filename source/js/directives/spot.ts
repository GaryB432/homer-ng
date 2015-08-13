namespace HomerWeb {
    App.directive('homerSpot', function factory($animate: ng.IAnimateService) {
        let directiveDefinitionObject: ng.IDirective = {
            templateUrl: 'templates/directives/spot.html',
            scope: {
                spot: '='
            }
        };
        return directiveDefinitionObject;
    });
}
