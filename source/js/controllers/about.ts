namespace HomerWeb {
	interface AboutScope extends ng.IScope {
		awesomeThings: string[]
	}

	class AboutController {
		awesomeThings = [
			'Lorem',
			'Sit Amet'
		]
		constructor($scope: AboutScope, $routeParams: ng.route.IRouteParamsService) {
		}
	}

	App.controller('AboutCtrl', AboutController);
}
