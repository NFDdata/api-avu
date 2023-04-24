"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanRut = void 0;
const cleanRut = (rut) => {
    return rut
        .toString()
        .toLocaleLowerCase()
        .replace(/[^0-9k]/g, '');
};
exports.cleanRut = cleanRut;
//# sourceMappingURL=rut.helper.js.map