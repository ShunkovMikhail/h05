"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefault = void 0;
//returns def if the value is undefined
const setDefault = (val, def) => {
    if (val !== undefined) {
        return val;
    }
    return def;
};
exports.setDefault = setDefault;
