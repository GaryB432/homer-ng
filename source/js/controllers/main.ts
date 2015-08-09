namespace HomerWeb {
    interface IHomerHomeCtrl {
        home: ILoca;
        current: ILoca;
        distance: number;
        setHome: () => void;
        setCurrent: () => void;
        mapUrl: string;
        isMapVisible: boolean;
    }

    class HomerHomeCtrl implements IHomerHomeCtrl {
        home: ILoca;
        current: ILoca;
        distance: number;
        mapUrl: string;
        isMapVisible: boolean;
        constructor(private svc: HomerWeb.HomerService) {
            this.home = this.svc.home;
            this.initializeCurrent();
        }
        setCurrent() {
            this.svc.getCurrentLocation()
                .then((current: ILoca) => {
                    this.current = current;
                    if (!!this.home) {
                        this.mapUrl = this.svc.getStaticMap(this.home.coordinates, this.current.coordinates);
                        this.distance = this.svc.metersToHome;
                        this.isMapVisible = true;
                    }
                }, (e) => { this.current = { coordinates: undefined, address: e, dms: undefined, latLon: undefined }; });
        }
        setHome() {
            this.svc.getCurrentLocation()
                .then((current: ILoca) => {
                    this.svc.setHomeLocation(this.home = current);
                    this.initializeCurrent();
                }, (e) => { alert(e); });
        }
        private initializeCurrent() {
            this.current = this.svc.initializedLoca;
            this.distance = undefined;
            this.isMapVisible = false;
        }
    }

    App.controller('HomerHomeCtrl', ['homerService', HomerHomeCtrl]);
}
