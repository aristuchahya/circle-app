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
exports.userController = void 0;
var users_service_1 = require("../services/users-service");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_service_1.userService.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = res.locals.user.id;
                        return [4 /*yield*/, users_service_1.userService.getUserById(Number(userId))];
                    case 1:
                        user = _a.sent();
                        res.status(200).json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var create, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, users_service_1.userService.createUser(req.body)];
                    case 1:
                        create = _a.sent();
                        res.status(201).json(create);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, body, update, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userId = res.locals.user.id;
                        return [4 /*yield*/, users_service_1.userService.getUserById(userId)];
                    case 1:
                        user = _a.sent();
                        console.log("user update:", user);
                        if (!user)
                            return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                        body = __assign(__assign({}, req.body), { photoProfile: req.file.path });
                        return [4 /*yield*/, users_service_1.userService.updateUser(userId, body)];
                    case 2:
                        update = _a.sent();
                        console.log("update result:", update);
                        res.status(201).json(update);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, error_4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, remove, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, users_service_1.userService.getUserById(Number(id))];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                        return [4 /*yield*/, users_service_1.userService.deleteUser(Number(id))];
                    case 2:
                        remove = _a.sent();
                        res.status(201).json({ message: "User deleted", remove: remove });
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, error_5];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // async followStatus(req: Request, res: Response) {
    //   try {
    //     const user = res.locals.user;
    //     if (!user) return res.status(404).json({ message: "User not found" });
    //     const result = await userService.find(user);
    //     res.status(201).json({ message: "find follows", result });
    //   } catch (error) {
    //     return res.status(500).json({ message: "Internal server error" });
    //   }
    // }
    UserController.prototype.follow = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, body, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = res.locals.user;
                        body = __assign(__assign({}, req.body), { followerId: user.id });
                        return [4 /*yield*/, users_service_1.userService.followUser(body)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: "success", result: result })];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.isFollow = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var followingId, followerId, status, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        followingId = req.params.followingId;
                        followerId = res.locals.user.id;
                        console.log("user :", followerId);
                        console.log("user 2 :", followingId);
                        if (!followingId)
                            return [2 /*return*/, res.status(400).json({ message: "Followed user ID is required" })];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, users_service_1.userService.isFollowing(followerId, Number(followingId))];
                    case 2:
                        status = _a.sent();
                        res.status(200).json({ isfollowing: status });
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        res.status(400).json({ message: error_7.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.findFollow = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, follow, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = res.locals.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, users_service_1.userService.findFollow(user)];
                    case 2:
                        follow = _a.sent();
                        res.status(200).json({ message: "success", follow: follow });
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _a.sent();
                        res.status(400).json({ message: error_8.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.findUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var search, users, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        search = req.query.search;
                        return [4 /*yield*/, users_service_1.userService.find(search)];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.json(users)];
                    case 2:
                        error_9 = _a.sent();
                        res.status(500).json({ message: error_9.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.userController = new UserController();
//# sourceMappingURL=user-controller.js.map