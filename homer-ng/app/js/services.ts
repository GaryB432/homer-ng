/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="homer.ts" />

module HomerWeb {
    'use strict';

    export class GeoService {
        getStaticMap(home: Coordinates, current: Coordinates) {
            return GoogleMapping.StaticMap.googleMapUrl(home, current);
        }
    }

    export class HomerService {
        constructor(public geo: GeoService) {
        }
        getUnsetLoca(): Homer.Loca {
            return {
                address: 'Click the Set Current button to see where you are and how from home',
                dms: null,
                coordinates: null
            };
        }
        getStaticMap(home: Coordinates, current: Coordinates): string {
            return this.geo.getStaticMap(home, current);
        }
    }

    angular.module('homerServices', []).
        service('geoService', [GeoService]).
        service('homerService', ['geoService', HomerService]);
}
