interface AboutScope extends ng.IScope{
	awesomeThings: string[]
}

App.controller('AboutCtrl', function ($scope: AboutScope, $routeParams: ng.route.IRouteParamsService) {
		$scope.awesomeThings = [
			'Lorem',
			'Ipsum',
			'Dolar',
			'Sit Amet'
		];
	});