describe('Distance Filter', function () {
    'use strict';

    var $filter, df;

    beforeEach(function () {
        module('homerApp');

        inject(function (_$filter_) {
            $filter = _$filter_;
            df = $filter('distanceFilter');
        });
    });

    it('exists', function () {
        expect(df).not.toBeNull();
    });

    it('should convert to miles', function () {
        expect(df(45061.632, 'miles')).toBeCloseTo(28);
    });
});
