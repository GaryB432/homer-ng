var HomerWeb;
(function (HomerWeb) {
    'use strict';

    var GeoService = (function () {
        function GeoService() {
        }
        GeoService.prototype.getStaticMap = function (home, current) {
            return GoogleMapping.StaticMap.googleMapUrl(home, current);
        };
        return GeoService;
    })();
    HomerWeb.GeoService = GeoService;

    var HomerService = (function () {
        function HomerService(geo) {
            this.geo = geo;
        }
        HomerService.prototype.getUnsetLoca = function () {
            return {
                address: 'Click the Set Current button to see where you are and how from home',
                dms: null,
                coordinates: null
            };
        };
        HomerService.prototype.getStaticMap = function (home, current) {
            return this.geo.getStaticMap(home, current);
        };
        return HomerService;
    })();
    HomerWeb.HomerService = HomerService;

    angular.module('homerServices', []).service('geoService', [GeoService]).service('homerService', ['geoService', HomerService]);
})(HomerWeb || (HomerWeb = {}));
//# sourceMappingURL=services.js.map
