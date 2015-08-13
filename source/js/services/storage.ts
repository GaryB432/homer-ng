
namespace HomerWeb {
    const KEY = "homer";
    let tempLocation: ILocation = {
        coordinates: {
            accuracy: 34,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 37.468319,
            longitude: -122.143936,
            speed: null
        },
        dms: "Click Set Home when you are at home",
        address: "East Palo Alto, CA, USA",
        latLon: "Home not set"
    };
    export class StorageService {
        writeInfo(info: IInfo): void {
            return this.save<IInfo>(KEY, info);
        }
        readInfo(): IInfo {
            let info = this.read<IInfo>(KEY) || { home: undefined,last: undefined };
            if (!info.home) {
                info.home = tempLocation;
            }

            if (!info.last) {
                info.last = { location: {
                    address: 'Where are you? Click Set Current.',
                    coordinates: angular.copy(info.home.coordinates),
                    dms: null,
                    latLon: 'You need to click Set Current for this to be any fun.'
                }, stamp: null }
            }
            return info;
        }
        private read<T>(key: string) {
            return <T>angular.fromJson(localStorage.getItem(key));
        }
        private save<T>(key: string, data: T) {
            localStorage.setItem(key, angular.toJson(data));
        }
    }
    App.service('storageService', [StorageService]);
}
