namespace HomerWeb {

	interface IHomerHomeCtrl {
		home: ILocation;
		last: ISpot;
		distance: number;
		setHome: () => void;
		setCurrent: () => void;
		mapUrl: string;
		isMapVisible: boolean;
	}

	class HomerHomeCtrl implements IHomerHomeCtrl {
		constructor(private svc: HomerWeb.HomerService) {
		}
		get home(): ILocation {
			return this.svc.home;
		}
		get last() {
			return this.svc.last;
		}
		get distance() {
			return this.svc.metersToHome;
		}
		get mapUrl() {
			return this.svc.mapUrl;
		}
		get isMapVisible(): boolean {
			return !!this.svc.mapUrl;
		}
		setHome() {
			this.svc.setHome().then((home) => console.log(home));
		}
		setCurrent() {
			this.svc.setCurrent().then((current) => console.log(current));
		}
	}

	App.controller('HomerHomeCtrl', ['homerService', HomerHomeCtrl]);
}
