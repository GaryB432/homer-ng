/// <reference path="../../typings/tsd.d.ts" />

var App = angular.module('homerApp', ['ngRoute','ngTouch', 'ngAnimate', 'angularMoment' ]);

App.config(function ($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
        .when('/', { templateUrl: 'templates/states/main.html', controller: 'HomerHomeCtrl', controllerAs: 'vm' })
        .when('/about', { templateUrl: 'templates/states/about.html', controller: 'AboutCtrl', controllerAs: 'vm' })
        .otherwise({ redirectTo: '/' });
});