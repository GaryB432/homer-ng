namespace HomerWeb {
    App.directive('homerLocation', function factory($animate: ng.IAnimateService) {
        let directiveDefinitionObject: ng.IDirective = {
            templateUrl: 'templates/directives/location.html',
            scope: {
                location: '='
            }
        };
        return directiveDefinitionObject;
    });
}
