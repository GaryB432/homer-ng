namespace HomerWeb {
    interface VenessGeo {
        // www.movable-type.co.uk/scripts/latlong.html
        parseDMS(dms: string): number;
        toDMS(deg: number, format?: string, dp?: number): string;
        toLat(deg: number, format?: string, dp?: number): string;
        toLon(deg: number, format?: string, dp?: number): string;
        toBrng(deg: number, format?: string, dp?: number): string;
    }
    declare var Geo: VenessGeo;
    export interface ILocation {
        coordinates: Coordinates;
        dms: string;
        address: string;
        latLon: string;
    }
    export class GeoService {
        getStaticMap(home: Coordinates, current: Coordinates) {
            return GoogleMapping.StaticMap.googleMapUrl(home, current);
        }
        coordsToDMS(coords: Coordinates): string {
            return Geo.toLat(coords.latitude).concat(',').concat(Geo.toLon(coords.longitude));
        }
    }
    
    export class HomerService {
        home: ILocation;
        current: ILocation;
        metersToHome: number;
        constructor(private qService: ng.IQService, private geo: GeoService, private key: string) {
            this.home = this.readHomeFromLocalStorage();
        }
        get initializedLoca(): ILocation {
            return {
                address: 'Where are you? Click Set Current.',
                dms: null,
                coordinates: null,
                latLon: 'You need to click Set Current for this to be any fun.'
            };
        }
        getLoca(coords: Coordinates): ng.IPromise<ILocation> {
            let d = this.qService.defer<ILocation>();
            GoogleGeocoding.GeoCoder.getAddress(
                coords,
                (address) => d.resolve(<ILocation>{
                    coordinates: coords,
                    dms: this.geo.coordsToDMS(coords),
                    address: address,
                    latLon: GoogleMapping.StaticMap.coordsToString(coords)
                }),
                (status) => d.reject(status));
            return d.promise;
        }
        readHomeFromLocalStorage(): ILocation {
            return angular.fromJson(localStorage.getItem(this.key));
        }
        getStaticMap(home: Coordinates, current: Coordinates): string {
            return this.geo.getStaticMap(home, current);
        }
        readNav(): ng.IPromise<Coordinates> {
            let def = this.qService.defer();
            navigator.geolocation.getCurrentPosition(
                (position) =>
                    // make copy of coordinates because of native flakiness
                    def.resolve({
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        speed: position.coords.speed
                    }),
                (e) => def.reject(e), null);
            return def.promise;
        }
        readCurrent(): ng.IPromise<ILocation> {
            return this.readNav().then((coords: Coordinates) => this.getLoca(coords));
        }
        getCurrentLocation(): ng.IPromise<ILocation> {
            return this.readCurrent().then((loc: ILocation) => {
                this.metersToHome = !!this.home ? GoogleGeocoding.GeoCoder.computeDistanceBetween(this.home.coordinates, loc.coordinates) : undefined;
                return this.current = loc;
            });
        }
        setHomeLocation(location: ILocation): void {
            localStorage.setItem(this.key, angular.toJson(this.home = location));
        }
    }

    App
        .value('homeLocationKey', 'HomeLocation')
        .service('geoService', [GeoService])
        .service('homerService', ['$q', 'geoService', 'homeLocationKey', HomerService]);
}
