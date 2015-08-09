module HomerWeb {
    function translateMeters(meters: number, unit: string) {
        switch (unit) {
            case 'miles':
                return meters * 0.000621371192237
            default:
                throw new Error(`${unit} is an unknown unit`);
        }
    }
    App.filter('distanceFilter', () => translateMeters);
}
