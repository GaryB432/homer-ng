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
    export interface ILoca {
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
        public home: ILoca;
        public current: ILoca;
        public metersToHome: number;
        constructor(public qService: ng.IQService, public geo: GeoService, public key: string) {
            this.home = this.readHomeFromLocalStorage();
        }
        get unsetLoca(): ILoca {
            return {
                address: 'Where are you? Click Set Current.',
                dms: null,
                coordinates: null,
                latLon: 'You need to click Set Current for this to be any fun.'
            };
        }
        getLoca(coords: Coordinates): ng.IPromise<ILoca> {
            let d = this.qService.defer<ILoca>();
            GoogleGeocoding.GeoCoder.getAddress(
                coords,
                (address) => d.resolve(<ILoca>{
                    coordinates: coords,
                    dms: this.geo.coordsToDMS(coords),
                    address: address,
                    latLon: GoogleMapping.StaticMap.coordsToString(coords)
                }),
                (status) => d.reject(status));
            return d.promise;
        }
        readHomeFromLocalStorage(): ILoca {
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
        readCurrent(): ng.IPromise<ILoca> {
            return this.readNav().then((coords: Coordinates) => this.getLoca(coords));
        }
        getCurrentLocation(): ng.IPromise<ILoca> {
            return this.readCurrent().then((loc: ILoca) => {
                this.metersToHome = !!this.home ? GoogleGeocoding.GeoCoder.computeDistanceBetween(this.home.coordinates, loc.coordinates) : undefined;
                return this.current = loc;
            });
        }
        setHomeLocation(location: ILoca): ILoca {
            localStorage.setItem(this.key, angular.toJson(this.home = location));
            return this.home;
        }
    }

    App
        .value('homeLocationKey', 'HomeLocation')
        .service('geoService', [GeoService])
        .service('homerService', ['$q', 'geoService', 'homeLocationKey', HomerService]);
}
