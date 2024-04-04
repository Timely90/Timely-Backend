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
exports.UserTimely = void 0;
const typeorm_1 = require("typeorm");
let UserTimely = class UserTimely {
};
exports.UserTimely = UserTimely;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserTimely.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], UserTimely.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], UserTimely.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserTimely.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "user" }),
    __metadata("design:type", String)
], UserTimely.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], UserTimely.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], UserTimely.prototype, "deletedAt", void 0);
exports.UserTimely = UserTimely = __decorate([
    (0, typeorm_1.Entity)()
], UserTimely);
//# sourceMappingURL=user.entity.js.map