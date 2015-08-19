namespace HomerWeb {
	interface AboutScope extends ng.IScope {
		awesomeThings: string[]
	}
	class AboutCtrl {
		awesomeThings = [
			'Lorem',
			'Sit Amet',
			'EcmaScript'
		]
		constructor(params: ng.route.IRouteParamsService) {
				console.log(params);
		}
	}

	App.controller('AboutCtrl', ['$routeParams', AboutCtrl]);
}
