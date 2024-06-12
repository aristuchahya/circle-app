"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerschema = exports.loginschema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.loginschema = joi_1.default.object({
    usernameOrEmail: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.registerschema = joi_1.default.object({
    fullName: joi_1.default.string().min(3).max(100),
    username: joi_1.default.string().required().min(3).max(15).trim(),
    email: joi_1.default.string().email().required().trim(),
    password: joi_1.default.string().required().min(6).trim(),
});
//# sourceMappingURL=auth.js.map