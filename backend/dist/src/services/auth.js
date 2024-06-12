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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
var client_1 = require("@prisma/client");
var auth_1 = require("../validator/auth");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var prisma = new client_1.PrismaClient();
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.register = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var validate, salt, hashedPassword, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        validate = auth_1.registerschema.validate(dto);
                        if (validate.error) {
                            return [2 /*return*/, validate.error];
                        }
                        salt = 10;
                        return [4 /*yield*/, bcrypt_1.default.hash(dto.password, salt)];
                    case 1:
                        hashedPassword = _a.sent();
                        dto.password = hashedPassword;
                        if (validate.error) {
                            throw new Error(validate.error.message);
                        }
                        return [4 /*yield*/, prisma.user.create({
                                data: __assign({}, dto),
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error(error_1.message || "Failed to register");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.login = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var validate, user, isValidPassword, jwtsecret, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        validate = auth_1.loginschema.validate(dto);
                        if (validate.error) {
                            throw new Error(validate.error.message);
                        }
                        return [4 /*yield*/, prisma.user.findFirst({
                                where: {
                                    OR: [
                                        {
                                            username: dto.usernameOrEmail,
                                        },
                                        {
                                            email: dto.usernameOrEmail,
                                        },
                                    ],
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("User Not Found");
                        return [4 /*yield*/, bcrypt_1.default.compare(dto.password, user.password)];
                    case 2:
                        isValidPassword = _a.sent();
                        if (!isValidPassword)
                            throw new Error("Invalid Password");
                        delete user.password;
                        jwtsecret = process.env.JWT_SECRET;
                        token = jsonwebtoken_1.default.sign(user, jwtsecret);
                        return [2 /*return*/, { user: user, token: token }];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error(error_2.message || "Failed to login");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
exports.authService = new AuthService();
//# sourceMappingURL=auth.js.map