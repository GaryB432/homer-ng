/// <reference path='../../typings/google/angular-1.0.d.ts' />
/// <reference path="../services/homer.ts" />

module HomerWeb {
    interface Scope extends ng.IScope {
        home: ILoca;
        current: ILoca;
        distance: number;
        setHome: () => void;
        setCurrent: () => void;
        mapUrl: string;
    }

    class HomerHomeCtrl {
        constructor($scope: Scope, homerSvc: HomerWeb.HomerService) {
            $scope.home = homerSvc.home;

            $scope.current = homerSvc.getUnsetLoca();

            //$scope.$watch('current', (current: ILoca, oldVal:ILoca) => console.log(current === $scope.current, oldVal));

            $scope.setHome = () => {
                homerSvc.getCurrentLocation().then((loc: ILoca) => {
                    $scope.home = $scope.current = homerSvc.setHomeLocation(loc);
                }, (e) => console.log(e));
            };

            var onCurrentLocationReceived = (loc: ILoca) => {
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

    App.controller('HomerHomeCtrl', ['$scope', 'homerService', HomerHomeCtrl]);
}