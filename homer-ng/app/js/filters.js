var HomerWeb;
(function (HomerWeb) {
    'use strict';

    angular.module('homerFilters', []).filter('distanceFilter', function () {
        return function (meters, a) {
            return (meters * 0.000621371192237);
        };
    });
})(HomerWeb || (HomerWeb = {}));
//# sourceMappingURL=filters.js.map
