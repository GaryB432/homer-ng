interface VenessDms {
    // www.movable-type.co.uk/scripts/latlong.html
    parseDMS(dms: string): number;
    toDMS(deg: number, format?: string, dp?: number): string;
    toLat(deg: number, format?: string, dp?: number): string;
    toLon(deg: number, format?: string, dp?: number): string;
    toBrng(deg: number, format?: string, dp?: number): string;
    compassPoint(bearing: number, precision?: number): string;    
}

declare var Dms: VenessDms;

namespace HomerWeb {
    export class GeoService {
        getStaticMap(home: Coordinates, current: Coordinates) {
            return GoogleMapping.StaticMap.googleMapUrl(home, current);
        }
        coordsToDms(coords: Coordinates): string {
            return Dms.toLat(coords.latitude).concat(',').concat(Dms.toLon(coords.longitude));
        }
    }
    App.service('geoService', [GeoService]);
}
