namespace HomerWeb {
	interface AboutScope extends ng.IScope {
		awesomeThings: string[]
	}

	class AboutController {
		constructor($scope: AboutScope, $routeParams: ng.route.IRouteParamsService) {
			$scope.awesomeThings = [
				'Lorem',
				'Sit Amet'
			];
		}
	}

	App.controller('AboutCtrl', AboutController);
}
