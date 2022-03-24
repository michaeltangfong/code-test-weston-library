import { DISPLAY } from './types';
/**
 * MIRN utility class aim for developer to validate MIRN, gathering checksum + business logic info
 */
export declare class mirn {
    protected _mirn: string;
    protected _market: string;
    protected _jurisdiction: string;
    protected _distributor: string;
    protected _checksum: string;
    protected _physical?: boolean;
    protected _logical?: boolean;
    /**
     * mirn class constructor
     * @param mirn - MIRN with or without checksum
     */
    constructor(mirn: string);
    get market(): string;
    get jurisdiction(): string;
    get distributor(): string;
    get checksum(): string;
    get physical(): boolean | undefined;
    get logical(): boolean | undefined;
    /**
     * Display MIRN in different format
     * @param type - must by of type DISPLAY or 0: standard, 1: short, 2: pretty
     */
    display(type: DISPLAY): string | undefined;
    /**
     * Check MIRN Length, alphanumeric and business logic (first 3 digits), this is a protected method can be extended for external use.
     * @param mirn - MIRN with or without checksum
     * @protected
     */
    protected validateMirn(mirn: string): void;
    /**
     * Reset all variables by giving MIRN
     * @param mirn - MIRN with or without checksum
     */
    reset(mirn: string): void;
}
