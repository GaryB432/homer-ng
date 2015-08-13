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
    export class GeoService {
        getStaticMap(home: Coordinates, current: Coordinates) {
            return GoogleMapping.StaticMap.googleMapUrl(home, current);
        }
        coordsToDMS(coords: Coordinates): string {
            return Geo.toLat(coords.latitude).concat(',').concat(Geo.toLon(coords.longitude));
        }
    }
    App.service('geoService', [GeoService]);
}
