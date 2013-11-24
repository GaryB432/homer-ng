/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="homer.ts" />
var HomerWeb;
(function (HomerWeb) {
    'use strict';
    var StaticMap = (function () {
        function StaticMap(mapDiv) {
            this.mapDiv = mapDiv;
        }
        StaticMap.marker = function (color, label, latlon) {
            return 'color:' + color + '%7C' + 'label:' + label + '%7C' + GoogleGeocoding.GeoCoder.getLatLng(latlon).toUrlValue();
        };
        StaticMap.googleMapUrl = function (home, current) {
            return 'https://maps.googleapis.com/maps/api/staticmap?size=290x345&sensor=true' + '&markers=' + StaticMap.marker('green', 'C', current) + '&markers=' + StaticMap.marker('blue', 'H', home);
        };
        StaticMap.googleMapImage = function (home, current) {
            var img = document.createElement("img");
            img.src = GoogleMapping.StaticMap.googleMapUrl(home, current);
            return img;
        };
        return StaticMap;
    })();
    HomerWeb.StaticMap = StaticMap;

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
