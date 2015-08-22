namespace HomerWeb {

	interface IHomerHomeCtrl {
		home: ILocation;
		last: ISpot;
		distance: number;
		setHome: () => void;
		setCurrent: () => void;
		mapUrl: string;
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
		setHome() {
			this.svc.setHome().catch((msg) => alert(msg));
		}
		setCurrent() {
			this.svc.setCurrent().catch((msg) => alert(msg));
		}
	}

	App.controller('HomerHomeCtrl', ['homerService', HomerHomeCtrl]);
}
