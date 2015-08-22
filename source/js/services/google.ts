class UrlParser {
    make(base: string, params: any): string {
        if (!params) return base;
        let a: string[] = [];
        for (let p in params) {
            if (Array.isArray(params[p])) {
                for (let r of params[p]) {
                    a.push(`${encodeURIComponent(p) }=${encodeURIComponent(r.toString()) }`);
                }
            } else {
                a.push(`${encodeURIComponent(p) }=${encodeURIComponent(params[p].toString()) }`);
            }
        }
        return base + (base.indexOf('?') < 0 ? '?' : '&') + a.join('&');
    }
}

namespace GoogleGeocoding {
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
            new google.maps.Geocoder().geocode({ location: GoogleGeocoding.GeoCoder.getLatLng(coords) }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
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

namespace GoogleMapping {
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
    interface StaticMapOptions {
        size: string;
        scale: string;
        markers: string[];
    }
    export class StaticMap {
        static coordsToString(latlon: Coordinates) {
            return GoogleGeocoding.GeoCoder.getLatLng(latlon).toString();
        }
        static googleMapUrl(home: Coordinates, current: Coordinates): string {
            let opts: StaticMapOptions = {
                size: '145x172',
                scale: '2',
                markers: [StaticMap.marker('green', 'C', current), StaticMap.marker('blue', 'H', home)]
            };
            return new UrlParser().make('https://maps.google.com/maps/api/staticmap', opts);
        }
        private static marker(color: string, label: string, latlon: Coordinates) {
            return `color:${color}|label:${label}|${GoogleGeocoding.GeoCoder.getLatLng(latlon).toUrlValue() }`;
        }
    }
}
