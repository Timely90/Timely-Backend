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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../users/users.service");
const bcryptjs = require("bcryptjs");
let GoogleService = class GoogleService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async googleLogin(req) {
        const name = req.user.firstName;
        const email = req.user.email;
        const telefono = "00000000";
        const password = "hola";
        const isVerified = true;
        let user = await this.usersService.findOneByEmail(email);
        let token;
        if (!user) {
            const hashedPassword = await bcryptjs.hash(password, 10);
            user = await this.saveUser({ name, email, telefono, password: hashedPassword, isVerified });
        }
        token = await this.generateToken(user);
        return {
            token: token,
            name: user.name,
            email: user.email
        };
    }
    async saveUser({ name, email, telefono, password, isVerified }) {
        return this.usersService.create({
            name,
            email,
            telefono,
            password,
            isVerified,
        });
    }
    async generateToken(user) {
        const payload = { email: user.email, name: user.name };
        return this.jwtService.signAsync(payload);
    }
};
exports.GoogleService = GoogleService;
exports.GoogleService = GoogleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], GoogleService);
//# sourceMappingURL=google.service.js.map