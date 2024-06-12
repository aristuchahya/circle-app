"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyController = void 0;
var reply_service_1 = require("../services/reply-service");
var ReplyController = /** @class */ (function () {
    function ReplyController() {
    }
    ReplyController.prototype.createReply = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, body, reply, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = res.locals.user;
                        if (!user)
                            return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                        body = __assign(__assign({}, req.body), { userId: user.id });
                        return [4 /*yield*/, reply_service_1.replyService.createReply(body)];
                    case 1:
                        reply = _a.sent();
                        res.status(201).json({ message: "Reply created", reply: reply });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Bad Request" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReplyController.prototype.addReply = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, content, dto, reply, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        userId = res.locals.user.id;
                        content = req.body.content;
                        dto = { content: content, userId: userId, threadId: Number(id) };
                        return [4 /*yield*/, reply_service_1.replyService.addReply(dto)];
                    case 1:
                        reply = _a.sent();
                        console.log("create reply", reply);
                        res.json(reply);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(400).json({ message: "Bad Request" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReplyController.prototype.countReplies = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var threadId, reply, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        threadId = req.params.threadId;
                        return [4 /*yield*/, reply_service_1.replyService.countReplies(Number(threadId))];
                    case 1:
                        reply = _a.sent();
                        res.json(reply);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(400).json({ message: "Bad Request" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReplyController.prototype.findAllReply = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, reply, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, reply_service_1.replyService.findAll(Number(id))];
                    case 1:
                        reply = _a.sent();
                        res.status(200).json(reply);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Bad Request" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReplyController.prototype.findReply = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, reply, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, reply_service_1.replyService.findBy(Number(id))];
                    case 1:
                        reply = _a.sent();
                        if (!reply)
                            return [2 /*return*/, res.status(404).json({ message: "Reply not found" })];
                        res.status(200).json({ message: "success", reply: reply });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Bad Request" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReplyController.prototype.deleteReply = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, reply, deleteReply, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, reply_service_1.replyService.findBy(Number(id))];
                    case 1:
                        reply = _a.sent();
                        if (!reply)
                            return [2 /*return*/, res.status(404).json({ message: "Reply not found" })];
                        return [4 /*yield*/, reply_service_1.replyService.deleteReply(Number(id))];
                    case 2:
                        deleteReply = _a.sent();
                        res.status(200).json({ message: "Reply has deleted" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Bad Request" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ReplyController;
}());
exports.replyController = new ReplyController();
//# sourceMappingURL=reply-controller.js.map