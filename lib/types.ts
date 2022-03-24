export enum DISPLAY { STANDARD = 0, SHORT = 1, PRETTY = 2 }

export enum ERRORS {
    MARKET_NOT_EXIST = "invalid MIRN, market code in pos 1 not exist",
    JURISDICTION_NOT_EXIST = "invalid MIRN, jurisdiction code in pos 2 not exist",
    DISTRIBUTOR_NOT_EXIST = "invalid MIRN, distributor code in pos 3 not exist",
    MIRN_NOT_IN_RANGE = "invalid MIRN not within range"
}
