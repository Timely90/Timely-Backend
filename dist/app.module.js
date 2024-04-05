"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const archives_module_1 = require("./archives/archives.module");
const salon_module_1 = require("./salon/salon.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
require('dotenv').config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.host,
                username: process.env.usernameDta,
                password: process.env.password,
                database: process.env.database,
                entities: [(0, path_1.join)(__dirname + '/**/*.entity{.ts,.js}')],
                synchronize: false,
                ssl: {
                    rejectUnauthorized: true,
                },
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            archives_module_1.ArchivesModule,
            salon_module_1.SalonModule,
            cloudinary_module_1.CloudinaryModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map