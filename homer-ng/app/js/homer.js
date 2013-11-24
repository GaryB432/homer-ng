/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/google/google.maps.d.ts" />
var GoogleGeocoding;
(function (GoogleGeocoding) {
    var GeoCoder = (function () {
        function GeoCoder() {
        }
        GeoCoder.computeDistanceBetween = function (from, to, radius) {
            return google.maps.geometry.spherical.computeDistanceBetween(GoogleGeocoding.GeoCoder.getLatLng(from), GoogleGeocoding.GeoCoder.getLatLng(to), radius);
        };
        GeoCoder.getAddress = function (coords, done, fail) {
            //fail(google.maps.GeocoderStatus.INVALID_REQUEST);
            //setTimeout(() => done(GoogleGeocoding.GeoCoder.getLatLng(coords).toString()), 3000);
            new google.maps.Geocoder().geocode({ location: GoogleGeocoding.GeoCoder.getLatLng(coords) }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    done(results[0].formatted_address);
                } else {
                    fail(status);
                }
            });
        };
        GeoCoder.getLatLng = function (coords) {
            return new google.maps.LatLng(coords.latitude, coords.longitude, true);
        };
        return GeoCoder;
    })();
    GoogleGeocoding.GeoCoder = GeoCoder;
})(GoogleGeocoding || (GoogleGeocoding = {}));
var GoogleMapping;
(function (GoogleMapping) {
    var DynamicMap = (function () {
        function DynamicMap(mapDiv, opts) {
            this.map = new google.maps.Map(mapDiv, opts);
        }
        DynamicMap.prototype.showLocation = function (location, name) {
            var infowindow = new google.maps.InfoWindow({
                map: this.map,
                position: GoogleGeocoding.GeoCoder.getLatLng(location),
                content: name
            });
        };
        return DynamicMap;
    })();
    GoogleMapping.DynamicMap = DynamicMap;
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
    GoogleMapping.StaticMap = StaticMap;
})(GoogleMapping || (GoogleMapping = {}));
var Homer;
(function (Homer) {
    var App2 = (function () {
        function App2() {
        }
        App2.prototype.getLoca = function (coords) {
            var d = $.Deferred();
            GoogleGeocoding.GeoCoder.getAddress(coords, function (address) {
                return d.resolve({
                    coordinates: coords,
                    dms: Geo.toLat(coords.latitude).concat(',').concat(Geo.toLon(coords.longitude)),
                    address: address
                });
            }, function (status) {
                return d.reject(status);
            });
            return d.promise();
        };
        App2.prototype.start = function () {
            this.home = JSON.parse(localStorage.getItem(App2.homePositionKey));
            this.current = null;
        };
        App2.prototype.readCurrent = function () {
            var getPosition = $.Deferred(), self = this;
            navigator.geolocation.getCurrentPosition(function (position) {
                return getPosition.resolve(position.coords);
            }, function (e) {
                return getPosition.reject(e);
            }, null);
            return $.when(getPosition).then(function (coords) {
                return self.getLoca(coords);
            });
        };
        App2.prototype.getCurrentLocation = function () {
            var _this = this;
            var self = this;
            return $.when(self.readCurrent()).then(function (loc) {
                _this.metersToHome = !!_this.home ? GoogleGeocoding.GeoCoder.computeDistanceBetween(self.home.coordinates, loc.coordinates) : undefined;
                return self.current = loc;
            });
        };
        App2.prototype.setHomeLocation = function (location) {
            this.home = location;
            localStorage.setItem(App2.homePositionKey, JSON.stringify(location));
            return this.home;
        };
        App2.prototype.setCurrentAsHome = function () {
            var self = this;
            return $.when(this.getCurrentLocation()).then(function (loc) {
                return self.setHomeLocation(loc);
            });
        };
        App2.homePositionKey = 'HomeLocation';
        return App2;
    })();
    Homer.App2 = App2;
})(Homer || (Homer = {}));
//# sourceMappingURL=homer.js.map
