/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
'use strict';
var phonecatApp = angular.module('phonecatApp', [
    'ngRoute',
    'phonecatAnimations',
    'phonecatControllers',
    'phonecatFilters',
    'phonecatServices'
]);

phonecatApp.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/phones', {
            templateUrl: 'partials/phone-list.html',
            controller: 'PhoneListCtrl'
        }).when('/phones/:phoneId', {
            templateUrl: 'partials/phone-detail.html',
            controller: 'PhoneDetailCtrl'
        }).otherwise({
            redirectTo: '/phones'
        });
    }
]);

var homerApp = angular.module('homerApp', ['ng', 'homerControllers', 'homerDirectives']);
//# sourceMappingURL=app.js.map
