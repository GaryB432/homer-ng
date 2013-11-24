/// <reference path="../lib/typings/google/angular-1.0.d.ts" />

module HomerWeb {
    'use strict';
    var homerApp = angular.module('homerApp',
        [
            'homerControllers',
            'homerDirectives',
            'homerFilters',
            'homerServices'
        ]);
}