/// <reference path='../../typings/google/angular-1.0.d.ts' />

module HomerWeb {
    console.log(App);

    App.filter('distanceFilter', function () {
        return function (meters: number, a: string) {
            return (meters * 0.000621371192237);
        };
    });
}
