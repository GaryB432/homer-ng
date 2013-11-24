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
        app: Homer.App2 = new Homer.App2();
        constructor($scope: Scope, homerService: HomerWeb.HomerService ) {
            this.app.start();

            $scope.home = this.app.home;

            $scope.current = homerService.getUnsetLoca();

            //$scope.$watch('current', (current: Homer.Loca, oldVal:Homer.Loca) => console.log(current === $scope.current, oldVal));

            $scope.setHome = () => {
                $.when(this.app.getCurrentLocation()).then((loc: Homer.Loca) => {
                    $scope.home = $scope.current = this.app.setHomeLocation(loc);
                    $scope.$apply();
                }, (e) => console.log(e));
            };

            var onCurrentLocationReceived = (loc: Homer.Loca) => {
                $scope.current = loc;
                if (!!this.app.home) {
                    $scope.mapUrl = homerService.getStaticMap(this.app.home.coordinates, this.app.current.coordinates);
                    $scope.distance = this.app.metersToHome;
                }
            }

        $scope.setCurrent = () => {
                $.when(this.app.getCurrentLocation())
                    .then(onCurrentLocationReceived)
                    .fail((e) => {
                        $scope.current = { coordinates: null, address: e, dms: null };
                    })
                    .always(() => {
                        $scope.$apply();
                    });
            };
        }
    }

    homerControllers.controller('HomerHomeCtrl', ['$scope', 'homerService', HomerHomeCtrl]);
}