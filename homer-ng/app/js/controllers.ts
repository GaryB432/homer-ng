/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="services.ts" />
/// <reference path="homer.ts" />

module HomerWeb {

    'use strict';

    interface Scope extends ng.IScope {
        home: Homer.Loca;
        current: Homer.Loca;
        distance: number;
        setHome: () => void;
        setCurrent: () => void;
        mapUrl: string;
    }

    var homerControllers = angular.module('homerControllers', ['homerServices']);

    class HomerHomeCtrl {
        constructor($scope: Scope, homerSvc: HomerWeb.HomerService ) {
            $scope.home = homerSvc.home;

            $scope.current = homerSvc.getUnsetLoca();

            //$scope.$watch('current', (current: Homer.Loca, oldVal:Homer.Loca) => console.log(current === $scope.current, oldVal));

            $scope.setHome = () => {
                homerSvc.getCurrentLocation().then((loc: Homer.Loca) => {
                    $scope.home = $scope.current = homerSvc.setHomeLocation(loc);
                    $scope.$apply();
                }, (e) => console.log(e));
            };

            var onCurrentLocationReceived = (loc: Homer.Loca) => {
                $scope.current = loc;
                if (!!homerSvc.home) {
                    $scope.mapUrl = homerSvc.getStaticMap(homerSvc.home.coordinates, homerSvc.current.coordinates);
                    $scope.distance = homerSvc.metersToHome;
                }
            }

            $scope.setCurrent = () => {
                homerSvc.getCurrentLocation().then(
                    onCurrentLocationReceived,
                    (e) => {
                        $scope.current = { coordinates: null, address: e, dms: null };
                    });
            };
        }
    }

    homerControllers.controller('HomerHomeCtrl', ['$scope', 'homerService', HomerHomeCtrl]);
}