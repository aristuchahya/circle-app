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
        while (_) try {
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
exports.userService = void 0;
var client_1 = require("@prisma/client");
var cloudinary_1 = require("cloudinary");
var user_1 = require("../validator/user");
var prisma = new client_1.PrismaClient();
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.user.findMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.user.findUnique({
                                where: { id: id },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, null];
                        return [2 /*return*/, user];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.createUser = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var validate, upload, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        validate = user_1.userschema.validate(dto);
                        if (validate.error) {
                            return [2 /*return*/, validate.error];
                        }
                        cloudinary_1.v2.config({
                            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                            api_key: process.env.CLOUDINARY_API_KEY,
                            api_secret: process.env.CLOUDINARY_API_SECRET,
                        });
                        return [4 /*yield*/, cloudinary_1.v2.uploader.upload(dto.photoProfile, {
                                upload_preset: "circle-app",
                            })];
                    case 1:
                        upload = _a.sent();
                        return [4 /*yield*/, prisma.user.create({
                                data: __assign(__assign({}, dto), { photoProfile: upload.secure_url }),
                            })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateUser = function (id, dto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, upload, userUpdate, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, prisma.user.findFirst({
                                where: { id: Number(id) },
                            })];
                    case 1:
                        user = _a.sent();
                        if (dto.fullName) {
                            user.fullName = dto.fullName;
                        }
                        if (dto.bio) {
                            user.bio = dto.bio;
                        }
                        if (dto.photoProfile) {
                            user.photoProfile = dto.photoProfile;
                        }
                        cloudinary_1.v2.config({
                            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                            api_key: process.env.CLOUDINARY_API_KEY,
                            api_secret: process.env.CLOUDINARY_API_SECRET,
                        });
                        return [4 /*yield*/, cloudinary_1.v2.uploader.upload(dto.photoProfile, {
                                upload_preset: "circle-app",
                            })];
                    case 2:
                        upload = _a.sent();
                        return [4 /*yield*/, prisma.user.update({
                                where: { id: Number(id) },
                                data: __assign(__assign({}, user), { photoProfile: upload.secure_url }),
                            })];
                    case 3:
                        userUpdate = _a.sent();
                        return [2 /*return*/, userUpdate];
                    case 4:
                        error_4 = _a.sent();
                        return [2 /*return*/, error_4];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.user.delete({
                                where: { id: Number(id) },
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, error_5];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.followUser = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var followerId, followingId, follow, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        followerId = dto.followerId, followingId = dto.followingId;
                        if (followerId === followingId)
                            throw new Error("user cannot follow themselves");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prisma.following.create({
                                data: __assign({}, dto),
                            })];
                    case 2:
                        follow = _a.sent();
                        return [2 /*return*/, follow];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, error_6];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.isFollowing = function (followerId, followingId) {
        return __awaiter(this, void 0, void 0, function () {
            var follow, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.following.findUnique({
                                where: {
                                    followingId_followerId: {
                                        followerId: followerId,
                                        followingId: followingId,
                                    },
                                },
                            })];
                    case 1:
                        follow = _a.sent();
                        return [2 /*return*/, follow !== null];
                    case 2:
                        error_7 = _a.sent();
                        throw new Error("Failed to check follow status: ".concat(error_7.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findFollow = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var users, follows_1, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, prisma.user.findMany()];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, prisma.following.findMany({
                                where: {
                                    followerId: user.id,
                                },
                            })];
                    case 2:
                        follows_1 = _a.sent();
                        return [2 /*return*/, users.map(function (u) {
                                var isFollowing = follows_1.some(function (follow) { return follow.followingId === u.id; });
                                return __assign(__assign({}, u), { isFollowing: isFollowing });
                            })];
                    case 3:
                        error_8 = _a.sent();
                        throw new Error(error_8.message || "Failed to retrieve users");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.find = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            var error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.user.findMany({
                                orderBy: [
                                    {
                                        fullName: "asc",
                                    },
                                    {
                                        username: "asc",
                                    },
                                ],
                                where: {
                                    OR: [
                                        {
                                            username: {
                                                contains: search,
                                                mode: "insensitive",
                                            },
                                        },
                                        {
                                            fullName: {
                                                contains: search,
                                                mode: "insensitive",
                                            },
                                        },
                                    ],
                                },
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_9 = _a.sent();
                        throw new Error(error_9.message || "Failed to retrieve users");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.userService = new UserService();
//# sourceMappingURL=users-service.js.map