var App = angular.module('homerApp', ['ngRoute','ngTouch', 'ngAnimate' ]);

App.config(function ($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
        .when('/', { templateUrl: 'templates/states/main.html', controller: 'HomerHomeCtrl' })
        .when('/about', { templateUrl: 'templates/states/about.html', controller: 'AboutCtrl', controllerAs: 'vm' })
        .otherwise({
            redirectTo: '/'
        });
});