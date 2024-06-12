"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createfollowschema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createfollowschema = joi_1.default.object({
    followingId: joi_1.default.number().required(),
    followerId: joi_1.default.number().required(),
});
//# sourceMappingURL=follows-dto.js.map