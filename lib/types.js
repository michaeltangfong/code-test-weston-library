"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = exports.DISPLAY = void 0;
var DISPLAY;
(function (DISPLAY) {
    DISPLAY[DISPLAY["STANDARD"] = 0] = "STANDARD";
    DISPLAY[DISPLAY["SHORT"] = 1] = "SHORT";
    DISPLAY[DISPLAY["PRETTY"] = 2] = "PRETTY";
})(DISPLAY = exports.DISPLAY || (exports.DISPLAY = {}));
var ERRORS;
(function (ERRORS) {
    ERRORS["MARKET_NOT_EXIST"] = "invalid MIRN, market code in pos 1 not exist";
    ERRORS["JURISDICTION_NOT_EXIST"] = "invalid MIRN, jurisdiction code in pos 2 not exist";
    ERRORS["DISTRIBUTOR_NOT_EXIST"] = "invalid MIRN, distributor code in pos 3 not exist";
    ERRORS["MIRN_NOT_IN_RANGE"] = "invalid MIRN not within range";
})(ERRORS = exports.ERRORS || (exports.ERRORS = {}));
