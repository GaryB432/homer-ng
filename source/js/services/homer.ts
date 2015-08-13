interface VenessGeo {
    // www.movable-type.co.uk/scripts/latlong.html
    parseDMS(dms: string): number;
    toDMS(deg: number, format?: string, dp?: number): string;
    toLat(deg: number, format?: string, dp?: number): string;
    toLon(deg: number, format?: string, dp?: number): string;
    toBrng(deg: number, format?: string, dp?: number): string;
}

declare var Geo: VenessGeo;

namespace HomerWeb {

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
        metersToHome: number;
        constructor(private qService: ng.IQService, private geo: GeoService, private storageSvc: StorageService) {
            this.home = this.storageSvc.readHome();
        }
        get initializedLocation(): ILocation {
            return {
                address: 'Where are you? Click Set Current.',
                dms: null,
                coordinates: null,
                latLon: 'You need to click Set Current for this to be any fun.'
            };
        }
        getStaticMap(home: Coordinates, current: Coordinates): string {
            return this.geo.getStaticMap(home, current);
        }
        getCurrentLocation(): ng.IPromise<ILocation> {
            return this.readCurrent().then((current: ILocation) => {
                this.metersToHome = !!this.home ? GoogleGeocoding.GeoCoder.computeDistanceBetween(this.home.coordinates, current.coordinates) : undefined;
                return current;
            });
        }
        saveHomeLocation(location: ILocation): void {
            this.storageSvc.saveHomeLocation(location);
        }
        private getLocation(coords: Coordinates): ng.IPromise<ILocation> {
            let d = this.qService.defer<ILocation>();
            GoogleGeocoding.GeoCoder.getAddress(
                coords,
                (address) => d.resolve({
                    coordinates: coords,
                    dms: this.geo.coordsToDMS(coords),
                    address: address,
                    latLon: GoogleMapping.StaticMap.coordsToString(coords)
                }),
                (status) => d.reject(status));
            return d.promise;
        }
         private readNav(): ng.IPromise<Coordinates> {
            let def = this.qService.defer<Coordinates>();
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
        private readCurrent(): ng.IPromise<ILocation> {
            return this.readNav().then((coords: Coordinates) => this.getLocation(coords));
        }
    }

    App
        .service('storageService', [StorageService])
        .service('geoService', [GeoService])
        .service('homerService', ['$q', 'geoService', 'storageService', HomerService]);
}
