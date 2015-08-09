namespace HomerWeb {
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
            $scope.current = homerSvc.unsetLoca;
            $scope.setHome = () => {
                homerSvc.getCurrentLocation().then((loc: ILoca) => {
                    $scope.home = $scope.current = homerSvc.setHomeLocation(loc);
                }, (e) => console.log(e));
            };

            let onCurrentLocationReceived = (loc: ILoca) => {
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
                        $scope.current = { coordinates: undefined, address: e, dms: undefined, latLon: undefined };
                    });
            };
        }
    }

    App.controller('HomerHomeCtrl', ['$scope', 'homerService', HomerHomeCtrl]);
}
