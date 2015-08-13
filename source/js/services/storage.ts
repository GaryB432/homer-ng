namespace HomerWeb {
    interface IStorageKeys {
        homeLocationKey: string;
        currentLocationKey: string;
    }
    
    export class StorageService {
        keys: IStorageKeys = {
            homeLocationKey: 'HomeLocation',
            currentLocationKey: 'currentLocation'
        };

        saveHomeLocation(location: ILocation): void {
            return this.save(this.keys.homeLocationKey, location);
        }
        readHomeLocation(): ILocation {
            return this.read<ILocation>(this.keys.homeLocationKey);
        }
        saveCurrentLocation(location: ILocation): void {
            return this.save(this.keys.currentLocationKey, location);
        }
        readCurrentLocation(): ILocation {
            return this.read<ILocation>(this.keys.currentLocationKey);
        }
        private read<T>(key: string) {
            return <T>angular.fromJson(localStorage.getItem(key));
        }
        private save<T>(key: string, data: T){
            localStorage.setItem(key, angular.toJson(data));
        }
    }
    App.service('storageService', [StorageService]);
}
