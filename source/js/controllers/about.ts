namespace HomerWeb {
	interface AboutScope extends ng.IScope {
		awesomeThings: string[]
	}
	class AboutCtrl {
		awesomeThings = [
			'Lorem',
			'Sit Amet'
		]
		constructor(params: ng.route.IRouteParamsService) {
				console.log(params);
		}
	}

	App.controller('AboutCtrl', ['$routeParams', AboutCtrl]);
}
