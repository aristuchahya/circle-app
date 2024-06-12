"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createthreadschema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createthreadschema = joi_1.default.object({
    image: joi_1.default.string().optional(),
    content: joi_1.default.string().min(1).required(),
    createdBy: joi_1.default.number().optional(),
    numberOfReplies: joi_1.default.number().optional(),
});
//# sourceMappingURL=threads.js.map