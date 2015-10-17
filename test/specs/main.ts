/// <reference path="../../typings/tsd" />
/// <reference path="../../app/js/main" />

'use strict';

describe('Distance Filter', function() {
    let $filter: any, df: any;

    beforeEach(function() {
        module('homerApp');

        inject(function(_$filter_: any) {
            $filter = _$filter_;
            df = $filter('distanceFilter');
        });
    });

    it('exists', function() {
        expect(df).not.toBeNull();
    });

    it('should convert to miles', function() {
        expect(df(45061.632, 'miles')).toBeCloseTo(28, 2);
    });
});

describe('UrlParser', function() {
    let p: UrlParser;
    beforeEach(function() {
        p = new UrlParser();
    });

    it('should make properly', function() {
        expect(p.make('url')).toBe('url');
        expect(p.make('url', { fun: 'oh yes' })).toBe('url?fun=oh%20yes');
        expect(p.make('url', { fun: 'oh yes', more: 'too' })).toBe('url?fun=oh%20yes&more=too');
        expect(p.make('url?here=ok', { fun: 'oh yes', more: 'too' })).toBe('url?here=ok&fun=oh%20yes&more=too');
        expect(p.make('url?here=ok', { fun: 'oh yes', more: ['too', 'tr|ee'] })).toBe('url?here=ok&fun=oh%20yes&more=too&more=tr%7Cee');
    });
});

describe('GoogleMapping', function() {
    it('should generate', function() {

        expect(GoogleMapping.StaticMap.googleMapUrl(
            {
                accuracy: 0,
                altitude: 0,
                altitudeAccuracy: 0,
                heading: 0,
                latitude: 2,
                longitude: 1,
                speed: 0
            },
            {
                accuracy: 0,
                altitude: 0,
                altitudeAccuracy: 0,
                heading: 0,
                latitude: 4,
                longitude: 3,
                speed: 0
            }))
            .toBe('https://maps.google.com/maps/api/staticmap?size=145x172&scale=2&markers=color%3Agreen%7Clabel%3AC%7C4%2C3&markers=color%3Ablue%7Clabel%3AH%7C2%2C1');
    });
});
