/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
'use strict';
angular.module('homerFilters', []).filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});
//# sourceMappingURL=filters.js.map
