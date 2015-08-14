namespace HomerWeb {
    export interface IInfo {
        home: ILocation;
        last: ISpot;
    }
    export interface ISpot {
        location: ILocation;
        stamp: Date;
    }
    export interface ILocation {
        coordinates: Coordinates;
        dms: string;
        address: string;
        latLon: string;
    }
    export class HomerService {
        private _info: IInfo;
        constructor(private qService: ng.IQService, private geo: GeoService, private storageSvc: StorageService) {
            this._info = this.storageSvc.readInfo();
        }
        get home(): ILocation {
            return this._info.home;
        }
        get last(): ISpot {
            return this._info.last;
        }
        get metersToHome(): number {
            return this.computeMeterDistance(this._info);
        }
        setCurrent(): ng.IPromise<ILocation> {
            return this.processCurrentLocation();
        }
        setHome(): ng.IPromise<ILocation> {
            return this.processCurrentLocation((current) => {
                this._info.home = current;
            });
        }
        private processCurrentLocation(handleCurrentLocation?: (current: ILocation) => void): ng.IPromise<ILocation> {
            return this.getCurrentLocation()
                .then((current) => {
                    if (handleCurrentLocation != void 0) {
                        handleCurrentLocation(current);
                    }
                    this._info.last = { location: current, stamp: new Date() }
                    this.storageSvc.writeInfo(this._info);
                    return current;
                });
        }
        private computeMeterDistance(info: IInfo): number {
            return GoogleGeocoding.GeoCoder.computeDistanceBetween(info.home.coordinates, info.last.location.coordinates);
        }
        get mapUrl(): string {
            return this.getStaticMap(this._info.home.coordinates, this._info.last.location.coordinates);
        }
        private getStaticMap(home: Coordinates, current: Coordinates): string {
            return this.geo.getStaticMap(home, current);
        }
        private getCurrentLocation(): ng.IPromise<ILocation> {
            return this.readCurrentLocation().then((current: ILocation) => {
                return current;
            });
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
        private readCurrentLocation(): ng.IPromise<ILocation> {
            return this.readNav().then((coords: Coordinates) => this.getLocation(coords));
        }
    }

    App.service('homerService', ['$q', 'geoService', 'storageService', HomerService]);
}
