"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var users_routes_1 = __importDefault(require("./routes/users-routes"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_output_json_1 = __importDefault(require("../swagger/swagger-output.json"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads"));
app.get("/", function (req, res) {
    res.send("Hello welcome to circle!");
});
app.use("/api/v1", users_routes_1.default);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default, {
    swaggerOptions: {
        persistAuthorization: true,
    },
}));
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
//# sourceMappingURL=index.js.map