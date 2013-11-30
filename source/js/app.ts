/// <reference path='../typings/google/angular-1.0.d.ts' />
/// <reference path='../typings/google/google.maps.d.ts' />

var App = angular.module('homerApp', ['ngRoute','ngTouch' ]);

App.config(function ($routeProvider: ng.IRouteProvider) {
    $routeProvider
        .when('/', { templateUrl: 'templates/states/main.html', controller: 'HomerHomeCtrl' })
        .when('/about', { templateUrl: 'templates/states/about.html', controller: 'AboutCtrl' })
        .otherwise({
            redirectTo: '/'
        });
});