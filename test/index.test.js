"use strict"

// this is only a sample test scripts

let successMira = '53000014P0'
describe(`weblib library`, () => {
    describe(`mira class with MIRA ${successMira} success cases`, () => {
        const lib = require('./../index');
        test('checksum must be 4', ()=> {
            expect(new lib.mirn(successMira).checksum).toBe('4');
        })
        test('market must be Retail Gas Market', ()=> {
            expect(new lib.mirn(successMira).market).toBe('Retail Gas Market');
        })
        test('Jurisdiction must be Victoria', ()=> {
            expect(new lib.mirn(successMira).jurisdiction).toBe('Victoria');
        })
        test('Distributor must be AEMO', ()=> {
            expect(new lib.mirn(successMira).distributor).toBe('AEMO');
        })
        test('MIRA standard display format must 53000014P04 ', ()=> {
            expect(new lib.mirn(successMira).display(lib.DISPLAY.STANDARD)).toBe('53000014P04');
        })
    });
    describe(`mira class fail cases`, () => {
        const lib = require('./../index');
        test('should throw market not exist error when pos 1 is 0', ()=> {
            expect(() => {
                new lib.mirn('02481614679')
            }).toThrow(Error(lib.ERRORS.MARKET_NOT_EXIST));
        })
    });
})
