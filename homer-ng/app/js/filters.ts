/// <reference path="../lib/typings/google/angular-1.0.d.ts" />

module HomerWeb {
    'use strict';

    angular.module('homerFilters', [])
        .filter('distanceFilter', function () {
            return function (meters: number, a: string) {
                return (meters * 0.000621371192237);
            };
        });
}
