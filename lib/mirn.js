"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mirn = void 0;
const types_1 = require("./types");
const markets = require('./../data/markets.json');
const jurisdictions = require('./../data/jurisdictions.json');
const ranges = require('./../data/ranges.json');
/**
 * MIRN utility class aim for developer to validate MIRN, gathering checksum + business logic info
 */
class mirn {
    /**
     * mirn class constructor
     * @param mirn - MIRN with or without checksum
     */
    constructor(mirn) {
        this.reset(mirn);
    }
    get market() { return this._market; }
    ;
    get jurisdiction() { return this._jurisdiction; }
    ;
    get distributor() { return this._distributor; }
    ;
    get checksum() { return this._checksum; }
    ;
    get physical() { return this._physical; }
    ;
    get logical() { return this._logical; }
    ;
    /**
     * Display MIRN in different format
     * @param type - must by of type DISPLAY or 0: standard, 1: short, 2: pretty
     */
    display(type) {
        switch (type) {
            case types_1.DISPLAY.STANDARD:
                return `${this._mirn}${this._checksum}`;
            case types_1.DISPLAY.SHORT:
                return `${this._mirn}`;
            case types_1.DISPLAY.PRETTY:
                return `${this._mirn}/${this._checksum}`;
            default:
                return undefined;
        }
    }
    ;
    /**
     * Check MIRN Length, alphanumeric and business logic (first 3 digits), this is a protected method can be extended for external use.
     * @param mirn - MIRN with or without checksum
     * @protected
     */
    validateMirn(mirn) {
        // check MIRN length and
        if (!new RegExp(/^[0-9]{8}[0-9PpLl]{1}[0-9Cc]{1}[0-9]{0,1}$/g).test(mirn))
            throw new Error(types_1.ERRORS.INVALID_MIRN);
        // check for market existence
        if (!markets[mirn[0]])
            throw new Error(types_1.ERRORS.MARKET_NOT_EXIST);
        // check for jurisdiction existence
        if (!jurisdictions[mirn[1]])
            throw new Error(types_1.ERRORS.JURISDICTION_NOT_EXIST);
        // check for distributor existence
        if (!jurisdictions[mirn[1]].distributors[mirn[2]])
            throw new Error(types_1.ERRORS.DISTRIBUTOR_NOT_EXIST);
        // check if MIRN within range
        let numeridMirn = parseInt(mirn.substring(0, 8));
        let passRange = false;
        ranges[mirn[1]].forEach((range) => {
            if (numeridMirn >= range.from && numeridMirn <= range.to)
                passRange = true;
        });
        if (!passRange)
            throw new Error(types_1.ERRORS.MIRN_NOT_IN_RANGE);
    }
    /**
     * Reset all variables by giving MIRN
     * @param mirn - MIRN with or without checksum
     */
    reset(mirn) {
        // validate and assign MIRN
        this.validateMirn(mirn);
        this._mirn = mirn.substring(0, 10).toUpperCase();
        // 2. process business logic
        this._market = markets[this._mirn.charAt(0)].name;
        this._jurisdiction = jurisdictions[this._mirn.charAt(1)].name;
        this._distributor = jurisdictions[this._mirn.charAt(1)].distributors[this._mirn.charAt(2)].name;
        // 3. calculate checksum
        let doubleThisChar = true, total = 0;
        for (let i = this._mirn.length; i > 0; i--) {
            // read each MIRN character, starting form right most
            let char = this._mirn[i - 1];
            // Read character and convert to its ASCII value
            let asciiCharNum = char.charCodeAt(0);
            // Double the ASCII value if the character is the right most or an alternate
            let asciiChar = (doubleThisChar ? asciiCharNum * 2 : asciiCharNum).toString();
            doubleThisChar = !doubleThisChar;
            // add the individual digits of the ASCII value to the total
            for (let x = 0; x < asciiChar.length; x++)
                total += parseInt(asciiChar[x]);
        }
        // checksum is calculated by total minus the next highest multiple of 10, below using reminder for the implementation
        this._checksum = (10 - (total % 10)).toString();
        // 4. check meter type
        this._physical = undefined;
        this._logical = undefined;
        if (this._mirn.charAt(2) === '0') {
            switch (this._mirn.charAt(8)) {
                case 'P':
                    this._physical = true;
                    this._logical = false;
                    break;
                case 'L':
                    this._physical = false;
                    this._logical = true;
                    break;
            }
        }
    }
}
exports.mirn = mirn;
