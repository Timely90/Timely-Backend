"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const auth_guard_1 = require("./guard/auth.guard");
const pass_dto_1 = require("./dto/pass.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(registerDto) {
        return this.authService.register(registerDto);
    }
    async update(updateUserDto) {
        const { id, name, email } = updateUserDto;
        return this.authService.updateEmailUser(id, name, email);
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
    emailRegister(email) {
        return this.authService.registerEmail(email);
    }
    updatePasswordEmail(req, passDto) {
        return this.authService.updatePasswordEmail(req.user.email, passDto);
    }
    updateVerification(req, isVerified) {
        return this.authService.updateVerificacion(req.user.email, isVerified);
    }
    findAll() {
        return this.authService.findAllEmail();
    }
    async findByEmail(email) {
        return this.authService.findByAdministrador(email);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Patch)("update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("email"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pass_dto_1.EmailDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "emailRegister", null);
__decorate([
    (0, common_1.Patch)('update-password-email'),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pass_dto_1.PassEmailDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updatePasswordEmail", null);
__decorate([
    (0, common_1.Patch)('tokens-verifi'),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateVerification", null);
__decorate([
    (0, common_1.Get)("users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findByEmail", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map