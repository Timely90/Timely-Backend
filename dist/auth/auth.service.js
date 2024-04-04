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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs = require("bcryptjs");
const users_service_1 = require("../users/users.service");
const fs = require("fs");
const path = require("path");
let AuthService = class AuthService {
    constructor(usersService, jwtService, mailerService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async findAll() {
        const users = await this.usersService.findAllUser();
        return users;
    }
    async register({ password, email, rol, name, isVerified }) {
        const user = await this.usersService.findOneByEmail(email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        if (user) {
            throw new common_1.BadRequestException("Correo electrónico ya existe.");
        }
        if (!emailRegex.test(email)) {
            throw new common_1.BadRequestException("Ingrese un correo válido.");
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        await this.usersService.create({
            name,
            email,
            rol,
            password: hashedPassword,
            isVerified
        });
        const Usuario = { email, name, password };
        let correo = "register";
        await this.envioEmail(Usuario, email, correo);
        return {
            message: "Usuario registrado correctamente.",
        };
    }
    async updateVerificacion(email, isVerified) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Usuario no existe");
        }
        await this.usersService.updateVerifi(email, isVerified);
        const payload = { email: user.email, name: user.name };
        const token = await this.jwtService.signAsync(payload);
        return {
            token: token,
            name: user.name,
            email: user.email,
        };
    }
    async login({ email, password }) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Correo inválido");
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Contraseña inválido");
        }
        if (user.isVerified == false) {
            throw new common_1.UnauthorizedException("Su cuenta no está verificada");
        }
        const payload = { email: user.email, name: user.name };
        const token = await this.jwtService.signAsync(payload);
        return {
            token: token,
            name: user.name,
            email: user.email
        };
    }
    async updatePasswordEmail(email, passDto) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Usuario no encontrado");
        }
        if (passDto.password !== passDto.verPassword) {
            throw new common_1.UnauthorizedException("Las contraseñas no coinciden");
        }
        const hashedNewPassword = await bcryptjs.hash(passDto.password, 10);
        await this.usersService.updatePasswordEmail(email, hashedNewPassword);
        const payload = { email: user.email, name: user.name };
        const token = await this.jwtService.signAsync(payload);
        return {
            tokens: token,
            name: user.name,
            email: user.email,
            message: "Contraseña actualizada correctamente",
        };
    }
    async registerEmail({ email }) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException("Correo electrónico no existe.");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        if (!emailRegex.test(email)) {
            throw new common_1.BadRequestException("Ingrese un correo válido.");
        }
        let correo = "verificacion";
        await this.envioEmail(user, email, correo);
        return { message: "Correo electrónico enviado." };
    }
    async envioEmail(user, email, correo) {
        const payload = { email: user.email, name: user.name };
        const token = await this.jwtService.signAsync(payload);
        let url;
        let filePath;
        if (correo == "register") {
            url = `https://timely12.netlify.app/timely-sesion?token=${token}`;
            filePath = path.resolve(process.cwd(), 'src/auth/html/plantillaReg.html');
        }
        if (correo == "verificacion") {
            url = `https://timely12.netlify.app/timely-passwordupemail?token=${token}`;
            filePath = path.resolve(process.cwd(), 'src/auth/html/plantilla.html');
        }
        const htmlTemplate = fs.readFileSync(filePath, 'utf8');
        const personalizedHtml = htmlTemplate
            .replace('{{name}}', user.name)
            .replace('{{token}}', url);
        await this.mailerService.sendMail({
            to: email,
            subject: "Correo de StarkBook",
            html: personalizedHtml,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map