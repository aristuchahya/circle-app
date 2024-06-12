"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createlikeschema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createlikeschema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    threadId: joi_1.default.number().required(),
});
//# sourceMappingURL=likes-dto.js.map