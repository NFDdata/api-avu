"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidationSchema = void 0;
const Joi = require("joi");
exports.JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3001),
    DEFAULT_LIMIT: Joi.number().default(5),
    JWT_SECRET_KEY: Joi.string().required(),
});
//# sourceMappingURL=joi.validation.js.map