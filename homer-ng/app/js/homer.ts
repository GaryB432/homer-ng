/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/google/google.maps.d.ts" />

interface VenessGeo {
    // www.movable-type.co.uk/scripts/latlong.html
    parseDMS(dms: string): number;
    toDMS(deg: number, format?: string, dp?: number): string;
    toLat(deg: number, format?: string, dp?: number): string;
    toLon(deg: number, format?: string, dp?: number): string;
    toBrng(deg: number, format?: string, dp?: number): string;
}

declare var Geo: VenessGeo;

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
module Homer {
    export interface Loca {
        coordinates: Coordinates;
        dms: string;
        address: string;
    }
    export interface CurrentLocationResponse {
        location: Coordinates;
        metersToHome: number;
    }
    export class HomerStaticMap extends GoogleMapping.StaticMap {
        constructor(mapDiv: Element, public home: Coordinates, public current: Coordinates) {
            super(mapDiv);
        }
        draw(): void {
            $(this.mapDiv).empty().css({ height: 345, width: 290 }).append(GoogleMapping.StaticMap.googleMapImage(this.home, this.current));
        }
    }
    export class App {
        homeCoordinates: Coordinates;
        zeroCoordinates: Coordinates = {
            speed: null,
            heading: null,
            altitudeAccuracy: null,
            accuracy: 0,
            altitude: null,
            longitude: -90.5515486,
            latitude: 38.5754833
        };
        static distanceText(meters: number): string {
            return (meters < 200) ? (meters * 3.28084).toPrecision(5).concat(' feet') : (meters * 0.000621371192237).toPrecision(4).concat(' miles');
        }
        static homePositionKey: string = 'HomeCoordinates';
        constructor() {
            this.homeCoordinates = this._getHomeCoordinates();
        }
        private _getHomeCoordinates(): Coordinates {
            return JSON.parse(localStorage.getItem(App.homePositionKey));
        }
        setHomeCoordinates(coordinates: Coordinates): void {
            return localStorage.setItem(App.homePositionKey, JSON.stringify(coordinates));
        }
        getCurrent(): JQueryDeferred<Coordinates> {
            var dfd = $.Deferred();
            navigator.geolocation.getCurrentPosition((position) => dfd.resolve(position.coords), (e) => dfd.reject(e), null);
            return dfd;
        }
        setCurrentAsHome(): JQueryDeferred<Coordinates> {
            var dfd = this.getCurrent();
            dfd.done((c) => this.setHomeCoordinates(c));
            return dfd;
        }
        updateCurrentLocation(): JQueryDeferred<CurrentLocationResponse> {
            var dfd = $.Deferred(), self = this;
            $.when(this.getCurrent()).then(function (currentCoords: Coordinates) {
                var r: CurrentLocationResponse = {
                    location: currentCoords,
                    metersToHome: self.computeDistanceTo(currentCoords)
                };
                return dfd.resolve(r);
            });
            return dfd;
        }
        computeDistanceTo(to: Coordinates, radius?: number) {
            return GoogleGeocoding.GeoCoder.computeDistanceBetween(this.homeCoordinates, to, radius);
        }
        getAddress(coords: Coordinates, done: (s: string) => void, fail: (s: google.maps.GeocoderStatus) => void): void {
            if (GoogleGeocoding.GeoCoder.computeDistanceBetween(coords, this.zeroCoordinates) < 10) {
                window.setTimeout(() => fail(google.maps.GeocoderStatus.INVALID_REQUEST), 2000); // you should know this address
            }
            else {
                GoogleGeocoding.GeoCoder.getAddress(coords, done, fail);
            }
        }
    }

    export class App2 {
        home: Loca;
        current: Loca;
        metersToHome: number;
        getLoca(coords: Coordinates): JQueryPromise<Loca> {
            var d = $.Deferred();
            GoogleGeocoding.GeoCoder.getAddress(
                coords,
                (address) => d.resolve(<Loca>{
                    coordinates: coords,
                    dms: Geo.toLat(coords.latitude).concat(',').concat(Geo.toLon(coords.longitude)),
                    address: address
                }),
                (status) => d.reject(status));
            return d.promise();
        }
        start(): void {
            this.home = JSON.parse(localStorage.getItem(App2.homePositionKey));
            this.current = null;
        }
        readCurrent(): JQueryPromise<Loca> {
            var getPosition = $.Deferred(), self = this;
            navigator.geolocation.getCurrentPosition((position) => getPosition.resolve(position.coords), (e) => getPosition.reject(e), null);
            return $.when(getPosition).then((coords: Coordinates) => self.getLoca(coords));
        }
        getCurrentLocation(): JQueryPromise<Loca> {
            var self = this;
            return $.when(self.readCurrent()).then((loc: Loca) => {
                this.metersToHome = !!this.home ? GoogleGeocoding.GeoCoder.computeDistanceBetween(self.home.coordinates, loc.coordinates) : undefined;
                return self.current = loc;
            });
        }
        setHomeLocation(location: Loca): Loca {
            this.home = location;
            localStorage.setItem(App2.homePositionKey, JSON.stringify(location));
            return this.home;
        }
        setCurrentAsHome() {
            var self = this;
            return $.when(this.getCurrentLocation()).then((loc: Loca) => self.setHomeLocation(loc));
        }
        static homePositionKey: string = 'HomeLocation';
    }
}