'use strict';
angular.module('homerFilters', []).filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});
//# sourceMappingURL=filters.js.map
