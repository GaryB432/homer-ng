/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="services.ts" />
/// <reference path="homer.ts" />
var HomerWeb;
(function (HomerWeb) {
    'use strict';

    var homerControllers = angular.module('homerControllers', ['homerServices']);

    var HomerHomeCtrl = (function () {
        function HomerHomeCtrl($scope, homerService) {
            var _this = this;
            this.app = new Homer.App2();
            this.app.start();

            $scope.home = this.app.home;

            $scope.current = homerService.getUnsetLoca();

            //$scope.$watch('current', (current: Homer.Loca, oldVal:Homer.Loca) => console.log(current === $scope.current, oldVal));
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
                    $scope.mapUrl = homerService.getStaticMap(_this.app.home.coordinates, _this.app.current.coordinates);
                    $scope.distance = _this.app.metersToHome;
                }
            };

            $scope.setCurrent = function () {
                $.when(_this.app.getCurrentLocation()).then(onCurrentLocationReceived).fail(function (e) {
                    $scope.current = { coordinates: null, address: e, dms: null };
                }).always(function () {
                    $scope.$apply();
                });
            };
        }
        return HomerHomeCtrl;
    })();

    homerControllers.controller('HomerHomeCtrl', ['$scope', 'homerService', HomerHomeCtrl]);
})(HomerWeb || (HomerWeb = {}));
//# sourceMappingURL=controllers.js.map
