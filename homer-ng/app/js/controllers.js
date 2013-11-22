'use strict';
var homerControllers = angular.module('homerControllers', []);

var HomerHomeCtrl = (function () {
    function HomerHomeCtrl($scope) {
        var _this = this;
        this.app = new Homer.App2();
        this.app.start();

        $scope.home = this.app.home;

        $scope.$watch('current', function (current, oldVal) {
            return console.log(current === $scope.current, oldVal);
        });

        $scope.setHome = function () {
            $.when(_this.app.getCurrentLocation()).then(function (loc) {
                $scope.home = $scope.current = _this.app.setHomeLocation(loc);
                $scope.$apply();
            }, function (e) {
                return console.log(e);
            });
        };

        var onCurrentLocationReceived = function (loc) {
            $scope.current = loc;
            if (!!_this.app.home) {
                $scope.currentCssClass = 'homerfun';
                $scope.mapUrl = GoogleMapping.StaticMap.googleMapUrl(_this.app.home.coordinates, _this.app.current.coordinates);
                $scope.distance = _this.app.metersToHome;
                console.log($scope.distance);
            }
        };

        $scope.setCurrent = function () {
            $scope.currentCssClass = '';
            $.when(_this.app.getCurrentLocation()).then(onCurrentLocationReceived).fail(function (e) {
                $scope.currentCssClass = 'err';
                $scope.current = { coordinates: null, address: e, dms: null };
            }).always(function () {
                $scope.$apply();
            });
        };
    }
    return HomerHomeCtrl;
})();

homerControllers.controller('HomerHomeCtrl', ['$scope', HomerHomeCtrl]);
//# sourceMappingURL=controllers.js.map
