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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const book_entity_1 = require("./entities/book.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("../auth/auth.service");
let BooksService = class BooksService {
    constructor(bookRepository, usersService, authService) {
        this.bookRepository = bookRepository;
        this.usersService = usersService;
        this.authService = authService;
    }
    async findAll() {
        const books = await this.bookRepository.find();
        return books;
    }
    async findById(id) {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book) {
            throw new common_1.NotFoundException(`Este libro no existe`);
        }
        return book;
    }
    async create(createBookDto) {
        const newBook = this.bookRepository.create(createBookDto);
        const creado = await this.bookRepository.save(newBook);
        if (creado) {
            const emailes = await this.usersService.findAllEmails();
            await this.enviarCorreos(emailes.emailes);
        }
        return newBook;
    }
    async update(id, updateBookDto) {
        const existingBook = await this.findById(id);
        const updatedBook = { ...existingBook, ...updateBookDto };
        const creado = await this.bookRepository.save(updatedBook);
        if (creado) {
            const emailes = await this.usersService.findAllEmails();
            await this.enviarCorreos(emailes.emailes);
        }
        return updatedBook;
    }
    async remove(id) {
        const existingBook = await this.findById(id);
        await this.bookRepository.remove(existingBook);
        return existingBook;
    }
    async enviarCorreos(emailes) {
        for (const email of emailes) {
            const user = await this.usersService.findOneByEmail(email);
            let correo = "books";
            await this.authService.envioEmail(user, user.email, correo);
        }
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.starkBook)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], BooksService);
//# sourceMappingURL=books.service.js.map