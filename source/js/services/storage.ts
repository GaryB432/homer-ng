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
            localStorage.setItem(this.keys.homeLocationKey, angular.toJson(location));
        }
        readHome(): ILocation {
            return this.read<ILocation>(this.keys.homeLocationKey);
        }
        private read<T>(key: string) {
            return <T>angular.fromJson(localStorage.getItem(key));
        }
    }
}
