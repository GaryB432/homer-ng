var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GoogleGeocoding;
(function (GoogleGeocoding) {
    var GeoCoder = (function () {
        function GeoCoder() {
        }
        GeoCoder.computeDistanceBetween = function (from, to, radius) {
            return google.maps.geometry.spherical.computeDistanceBetween(GoogleGeocoding.GeoCoder.getLatLng(from), GoogleGeocoding.GeoCoder.getLatLng(to), radius);
        };
        GeoCoder.getAddress = function (coords, done, fail) {
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
    var HomerStaticMap = (function (_super) {
        __extends(HomerStaticMap, _super);
        function HomerStaticMap(mapDiv, home, current) {
            _super.call(this, mapDiv);
            this.home = home;
            this.current = current;
        }
        HomerStaticMap.prototype.draw = function () {
            $(this.mapDiv).empty().css({ height: 345, width: 290 }).append(GoogleMapping.StaticMap.googleMapImage(this.home, this.current));
        };
        return HomerStaticMap;
    })(GoogleMapping.StaticMap);
    Homer.HomerStaticMap = HomerStaticMap;
    var App = (function () {
        function App() {
            this.zeroCoordinates = {
                speed: null,
                heading: null,
                altitudeAccuracy: null,
                accuracy: 0,
                altitude: null,
                longitude: -90.5515486,
                latitude: 38.5754833
            };
            this.homeCoordinates = this._getHomeCoordinates();
        }
        App.distanceText = function (meters) {
            return (meters < 200) ? (meters * 3.28084).toPrecision(5).concat(' feet') : (meters * 0.000621371192237).toPrecision(4).concat(' miles');
        };

        App.prototype._getHomeCoordinates = function () {
            return JSON.parse(localStorage.getItem(App.homePositionKey));
        };
        App.prototype.setHomeCoordinates = function (coordinates) {
            return localStorage.setItem(App.homePositionKey, JSON.stringify(coordinates));
        };
        App.prototype.getCurrent = function () {
            var dfd = $.Deferred();
            navigator.geolocation.getCurrentPosition(function (position) {
                return dfd.resolve(position.coords);
            }, function (e) {
                return dfd.reject(e);
            }, null);
            return dfd;
        };
        App.prototype.setCurrentAsHome = function () {
            var _this = this;
            var dfd = this.getCurrent();
            dfd.done(function (c) {
                return _this.setHomeCoordinates(c);
            });
            return dfd;
        };
        App.prototype.updateCurrentLocation = function () {
            var dfd = $.Deferred(), self = this;
            $.when(this.getCurrent()).then(function (currentCoords) {
                var r = {
                    location: currentCoords,
                    metersToHome: self.computeDistanceTo(currentCoords)
                };
                return dfd.resolve(r);
            });
            return dfd;
        };
        App.prototype.computeDistanceTo = function (to, radius) {
            return GoogleGeocoding.GeoCoder.computeDistanceBetween(this.homeCoordinates, to, radius);
        };
        App.prototype.getAddress = function (coords, done, fail) {
            if (GoogleGeocoding.GeoCoder.computeDistanceBetween(coords, this.zeroCoordinates) < 10) {
                window.setTimeout(function () {
                    return fail(google.maps.GeocoderStatus.INVALID_REQUEST);
                }, 2000);
            } else {
                GoogleGeocoding.GeoCoder.getAddress(coords, done, fail);
            }
        };
        App.homePositionKey = 'HomeCoordinates';
        return App;
    })();
    Homer.App = App;

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
