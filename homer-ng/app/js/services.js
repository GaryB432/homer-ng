var HomerWeb;
(function (HomerWeb) {
    'use strict';

    var GeoService = (function () {
        function GeoService() {
        }
        GeoService.prototype.getStaticMap = function (home, current) {
            return GoogleMapping.StaticMap.googleMapUrl(home, current);
        };
        GeoService.prototype.coordsToDMS = function (coords) {
            return Geo.toLat(coords.latitude).concat(',').concat(Geo.toLon(coords.longitude));
        };
        return GeoService;
    })();
    HomerWeb.GeoService = GeoService;

    var HomerService = (function () {
        function HomerService(qService, geo, key) {
            this.qService = qService;
            this.geo = geo;
            this.key = key;
            this.home = this.getHome();
        }
        HomerService.prototype.getUnsetLoca = function () {
            return {
                address: 'Click the Set Current button to see where you are and how from home',
                dms: null,
                coordinates: null
            };
        };
        HomerService.prototype.getLoca = function (coords) {
            var _this = this;
            var d = this.qService.defer();
            GoogleGeocoding.GeoCoder.getAddress(coords, function (address) {
                return d.resolve({
                    coordinates: coords,
                    dms: _this.geo.coordsToDMS(coords),
                    address: address
                });
            }, function (status) {
                return d.reject(status);
            });
            return d.promise;
        };
        HomerService.prototype.getHome = function () {
            return JSON.parse(localStorage.getItem(this.key));
        };
        HomerService.prototype.getStaticMap = function (home, current) {
            return this.geo.getStaticMap(home, current);
        };
        HomerService.prototype.readNav = function () {
            var def = this.qService.defer();
            navigator.geolocation.getCurrentPosition(function (position) {
                return def.resolve(position.coords);
            }, function (e) {
                return def.reject(e);
            }, null);
            return def.promise;
        };
        HomerService.prototype.readCurrent = function () {
            var _this = this;
            return this.readNav().then(function (coords) {
                return _this.getLoca(coords);
            });
        };
        HomerService.prototype.getCurrentLocation = function () {
            var _this = this;
            return this.readCurrent().then(function (loc) {
                _this.metersToHome = !!_this.home ? GoogleGeocoding.GeoCoder.computeDistanceBetween(_this.home.coordinates, loc.coordinates) : undefined;
                return _this.current = loc;
            });
        };
        HomerService.prototype.setHomeLocation = function (location) {
            this.home = location;
            localStorage.setItem(this.key, JSON.stringify(location));
            return this.home;
        };
        return HomerService;
    })();
    HomerWeb.HomerService = HomerService;

    angular.module('homerServices', []).value('homeLocationKey', 'HomeLocation').service('geoService', [GeoService]).service('homerService', ['$q', 'geoService', 'homeLocationKey', HomerService]);
})(HomerWeb || (HomerWeb = {}));
//# sourceMappingURL=services.js.map
