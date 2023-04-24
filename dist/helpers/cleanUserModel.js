"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUserModel = void 0;
const ramda_1 = require("ramda");
const omitValues = (0, ramda_1.omit)(['_id', '__v', 'password', 'activateAccountToken']);
const renameToId = (user) => {
    const id = (0, ramda_1.prop)('_id', user);
    return (0, ramda_1.assoc)('id', id, user);
};
exports.cleanUserModel = (0, ramda_1.pipe)(JSON.stringify, JSON.parse, renameToId, omitValues);
//# sourceMappingURL=cleanUserModel.js.map