"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userschema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.userschema = joi_1.default.object({
    fullName: joi_1.default.string(),
    bio: joi_1.default.string(),
    photoProfile: joi_1.default.string(),
});
//# sourceMappingURL=user.js.map