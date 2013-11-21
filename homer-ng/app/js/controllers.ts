/// <reference path="../lib/typings/google/angular-1.0.d.ts" />
/// <reference path="homer.ts" />

'use strict';

interface Scope extends ng.IScope {
    home: Homer.Loca;
    current: Homer.Loca;
    distance: number;
    setHome: () => void;
    setCurrent: () => void;
    mapUrl: string;
    currentCssClass: string;
}

var homerControllers = angular.module('homerControllers', []);

class HomerHomeCtrl {
    app: Homer.App2 = new Homer.App2();
    constructor($scope: Scope) {
        this.app.start();

        $scope.home = this.app.home;

        $scope.$watch('current', (current: Homer.Loca, oldVal:Homer.Loca) => console.log(current === $scope.current, oldVal));

        $scope.setHome = () => {
            $.when(this.app.getCurrentLocation()).then((loc: Homer.Loca) => {
                $scope.home = $scope.current = this.app.setHomeLocation(loc);
                $scope.$apply();
            }, (e) => console.log(e));
        };

        var onCurrentLocationReceived = (loc: Homer.Loca) => {
            $scope.current = loc;
            if (!!this.app.home) {
                $scope.currentCssClass = 'homerfun';
                $scope.mapUrl = GoogleMapping.StaticMap.googleMapUrl(this.app.home.coordinates, this.app.current.coordinates);
                $scope.distance = this.app.metersToHome;
                console.log($scope.distance);
            }
        }

        $scope.setCurrent = () => {
            $scope.currentCssClass = '';
            $.when(this.app.getCurrentLocation())
                .then(onCurrentLocationReceived)
                .fail((e) => {
                    alert(e);
                })
                .always(() => {
                    $scope.$apply();
                });
        };
    }
}

homerControllers.controller('HomerHomeCtrl', ['$scope', HomerHomeCtrl]);

