/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/google/google.maps.d.ts" />

module GoogleGeocoding {
    export class GeoCoder {
        static computeDistanceBetween(from: Coordinates, to: Coordinates, radius?: number) {
            return google.maps.geometry.spherical.computeDistanceBetween(
                GoogleGeocoding.GeoCoder.getLatLng(from),
                GoogleGeocoding.GeoCoder.getLatLng(to),
                radius);
        }
        static getAddress(coords: Coordinates, done: (s: string) => void, fail: (s: google.maps.GeocoderStatus) => void): void {
            //fail(google.maps.GeocoderStatus.INVALID_REQUEST);
            //setTimeout(() => done(GoogleGeocoding.GeoCoder.getLatLng(coords).toString()), 3000);
            new google.maps.Geocoder().geocode({ location: GoogleGeocoding.GeoCoder.getLatLng(coords) }, (results: google.maps.GeocoderResult[], status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    done(results[0].formatted_address);
                }
                else {
                    fail(status);
                }
            });
        }
        static getLatLng(coords: Coordinates): google.maps.LatLng {
            return new google.maps.LatLng(coords.latitude, coords.longitude, true);
        }
    }
}
module GoogleMapping {
    export class DynamicMap {
        map: google.maps.Map;
        constructor(mapDiv: Element, opts?: google.maps.MapOptions) {
            this.map = new google.maps.Map(mapDiv, opts);
        }
        showLocation(location: Coordinates, name: string) {
            var infowindow = new google.maps.InfoWindow({
                map: this.map,
                position: GoogleGeocoding.GeoCoder.getLatLng(location),
                content: name
            });
        }
    }
    export class StaticMap {
        constructor(public mapDiv: Element) {
        }
        static marker(color: string, label: string, latlon: Coordinates) {
            return 'color:' + color + '%7C' + 'label:' + label + '%7C' + GoogleGeocoding.GeoCoder.getLatLng(latlon).toUrlValue();
        }
        static googleMapUrl(home: Coordinates, current: Coordinates): string {
            return 'https://maps.googleapis.com/maps/api/staticmap?size=290x345&sensor=true' +
                '&markers=' + StaticMap.marker('green', 'C', current) +
                '&markers=' + StaticMap.marker('blue', 'H', home);
        }
        static googleMapImage(home: Coordinates, current: Coordinates): Element {
            var img = document.createElement("img");
            img.src = GoogleMapping.StaticMap.googleMapUrl(home, current);
            return img;
        }
    }
}
