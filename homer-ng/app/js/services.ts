/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="homer.ts" />

module HomerWeb {
    'use strict';

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
            this.home = this.getHome();
        }
        public getUnsetLoca(): ILoca {
            return {
                address: 'Click the Set Current button to see where you are and how from home',
                dms: null,
                coordinates: null
            };
        }
        getLoca(coords: Coordinates): ng.IPromise<ILoca> {
            var d = this.qService.defer();
            GoogleGeocoding.GeoCoder.getAddress(
                coords,
                (address) => d.resolve(<ILoca>{
                    coordinates: coords,
                    dms: this.geo.coordsToDMS(coords),
                    address: address
                }),
                (status) => d.reject(status));
            return d.promise;
        }
        getHome(): ILoca {
            return JSON.parse(localStorage.getItem(this.key));
        }
        getStaticMap(home: Coordinates, current: Coordinates): string {
            return this.geo.getStaticMap(home, current);
        }
        readNav(): ng.IPromise<Coordinates> {
            var def = this.qService.defer();
            navigator.geolocation.getCurrentPosition((position) => def.resolve(position.coords), (e) => def.reject(e), null);
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
            this.home = location;
            localStorage.setItem(this.key, JSON.stringify(location));
            return this.home;
        }
    }

    angular.module('homerServices', []).
        value('homeLocationKey', 'HomeLocation').
        service('geoService', [GeoService]).
        service('homerService', ['$q', 'geoService', 'homeLocationKey', HomerService]);
}
