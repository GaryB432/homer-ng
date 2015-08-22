/// <reference path="../source/js/services/google.ts" />

'use strict';

describe('Distance Filter', function () {
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

describe('UrlParser', function () {
    var p;
    beforeEach(function () {
        p = new UrlParser();
    });

    it('should make properly', function () {
        expect(p.make('url')).toBe('url');
        expect(p.make('url', { fun: 'oh yes' })).toBe('url?fun=oh%20yes');
        expect(p.make('url', { fun: 'oh yes', more: 'too' })).toBe('url?fun=oh%20yes&more=too');
        expect(p.make('url?here=ok', { fun: 'oh yes', more: 'too' })).toBe('url?here=ok&fun=oh%20yes&more=too');
        expect(p.make('url?here=ok', { fun: 'oh yes', more: ['too', 'tr|ee'] })).toBe('url?here=ok&fun=oh%20yes&more=too&more=tr%7Cee');
    });
});

describe('GoogleMapping', function () {
    it('should generate', function () {
        expect(GoogleMapping.StaticMap.googleMapUrl({ longitude: 1, latitude: 2 }, { longitude: 3, latitude: 4 }))
            .toBe('https://maps.google.com/maps/api/staticmap?size=145x172&scale=2&markers=color%3Agreen%7Clabel%3AC%7C4%2C3&markers=color%3Ablue%7Clabel%3AH%7C2%2C1');
    });
});
