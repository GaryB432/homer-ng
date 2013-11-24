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
//# sourceMappingURL=homer.js.map
