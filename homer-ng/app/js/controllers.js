/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="services.ts" />
/// <reference path="homer.ts" />
var HomerWeb;
(function (HomerWeb) {
    'use strict';

    var homerControllers = angular.module('homerControllers', ['homerServices']);

    var HomerHomeCtrl = (function () {
        function HomerHomeCtrl($scope, homerSvc) {
            $scope.home = homerSvc.home;

            $scope.current = homerSvc.getUnsetLoca();

            //$scope.$watch('current', (current: Homer.Loca, oldVal:Homer.Loca) => console.log(current === $scope.current, oldVal));
            $scope.setHome = function () {
                homerSvc.getCurrentLocation().then(function (loc) {
                    $scope.home = $scope.current = homerSvc.setHomeLocation(loc);
                    $scope.$apply();
                }, function (e) {
                    return console.log(e);
                });
            };

            var onCurrentLocationReceived = function (loc) {
                $scope.current = loc;
                if (!!homerSvc.home) {
                    $scope.mapUrl = homerSvc.getStaticMap(homerSvc.home.coordinates, homerSvc.current.coordinates);
                    $scope.distance = homerSvc.metersToHome;
                }
            };

            $scope.setCurrent = function () {
                homerSvc.getCurrentLocation().then(onCurrentLocationReceived, function (e) {
                    $scope.current = { coordinates: null, address: e, dms: null };
                });
            };
        }
        return HomerHomeCtrl;
    })();

    homerControllers.controller('HomerHomeCtrl', ['$scope', 'homerService', HomerHomeCtrl]);
})(HomerWeb || (HomerWeb = {}));
//# sourceMappingURL=controllers.js.map
