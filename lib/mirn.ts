import {DISPLAY} from './types';

const markets = require('./../data/markets.json');
const jurisdictions = require('./../data/jurisdictions.json');
const ranges = require('./../data/ranges.json');

/**
 * MIRN utility class aim for developer to validate MIRN, gathering checksum + business logic info
 */
export class mirn {
    protected _mirn!: string;
    protected _market!: string;
    protected _jurisdiction!: string;
    protected _distributor!: string;
    protected _checksum!: string;
    protected _physical?: boolean;
    protected _logical?: boolean;

    /**
     * mirn class constructor
     * @param mirn - MIRN with or without checksum
     */
    constructor(mirn: string) {
        this.reset(mirn);
    }

    get market(): string { return this._market; };
    get jurisdiction(): string { return this._jurisdiction };
    get distributor(): string { return this._distributor; };
    get checksum(): string { return this._checksum };
    get physical(): boolean | undefined { return this._physical };
    get logical(): boolean | undefined { return this._logical };

    /**
     * Display MIRN in different format
     * @param type - must by of type DISPLAY or 0: standard, 1: short, 2: pretty
     */
    public display(type: DISPLAY): string | undefined {
        switch (type){
            case DISPLAY.STANDARD:
                return `${this._mirn}${this._checksum}`;
            case DISPLAY.SHORT:
                return `${this._mirn}`;
            case DISPLAY.PRETTY:
                return `${this._mirn}/${this._checksum}`;
            default:
                return undefined;
        }
    };

    /**
     * Check MIRN Length, alphanumeric and business logic (first 3 digits), this is a protected method can be extended for external use.
     * @param mirn - MIRN with or without checksum
     * @protected
     */
    protected validateMirn(mirn: string): void {
        // check MIRN length and
        if (!new RegExp(/^[0-9]{8}[0-9PpLl]{1}[0-9Cc]{1}[0-9]{0,1}$/g).test(mirn)) throw new Error('invalid MIRN, accept ^[0-9]{8}[0-9PpLl]{1}[0-9Cc]{1}[0-9]{0,1}$');

        // check for market existence
        if (!markets[mirn[0]]) throw new Error()

        // check for jurisdiction existence
        if (!jurisdictions[mirn[1]]) throw new Error(`invalid MIRN, jurisdiction code ${mirn[1]} (in pos 2) not exist`)

        // check for distributor existence
        if (!jurisdictions[mirn[1]].distributors[mirn[2]]) throw new Error(`invalid MIRN, distributor code ${mirn[2]} (in pos 3) not exist in ${jurisdictions[mirn[1]].name}`)

        // check if MIRN within range
        let numeridMirn = parseInt(mirn.substring(0,8));
        let passRange = false;
        ranges[mirn[1]].forEach((range: { from: number; to: number; }) => {
            if (numeridMirn >= range.from && numeridMirn <= range.to)
                passRange = true;
        });
        if (!passRange) throw new Error(`invalid MIRN not within range`);
    }

    /**
     * Reset all variables by giving MIRN
     * @param mirn - MIRN with or without checksum
     */
    public reset(mirn: string): void {
        // validate and assign MIRN
        this.validateMirn(mirn);
        this._mirn = mirn.substring(0,10).toUpperCase();

        // 2. process business logic
        this._market = markets[this._mirn.charAt(0)].name;
        this._jurisdiction = jurisdictions[this._mirn.charAt(1)].name;
        this._distributor = jurisdictions[this._mirn.charAt(1)].distributors[this._mirn.charAt(2)].name;

        // 3. calculate checksum
        let doubleThisChar: boolean = true, total: number = 0
        for (let i=this._mirn.length; i > 0; i--) {
            // read each MIRN character, starting form right most
            let char = this._mirn[i-1];

            // Read character and convert to its ASCII value
            let asciiCharNum: number = char.charCodeAt(0);

            // Double the ASCII value if the character is the right most or an alternate
            let asciiChar: string = (doubleThisChar ? asciiCharNum * 2 : asciiCharNum).toString();
            doubleThisChar = !doubleThisChar;

            // add the individual digits of the ASCII value to the total
            for (let x=0; x < asciiChar.length; x++ )
                total += parseInt(asciiChar[x]);
        }

        // checksum is calculated by total minus the next highest multiple of 10, below using reminder for the implementation
        this._checksum = (10 - (total % 10)).toString();

        // 4. check meter type
        this._physical = undefined;
        this._logical = undefined;
        if (this._mirn.charAt(2) === '0') {
            switch (this._mirn.charAt(8)){
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
