import { starkBook } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
export declare class BooksService {
    private bookRepository;
    private usersService;
    private authService;
    constructor(bookRepository: Repository<starkBook>, usersService: UsersService, authService: AuthService);
    findAll(): Promise<starkBook[]>;
    findById(id: number): Promise<starkBook>;
    create(createBookDto: CreateBookDto): Promise<starkBook>;
    update(id: number, updateBookDto: UpdateBookDto): Promise<{
        name: string;
        categories: string;
        description: string;
        price: number;
        linkCompra: string;
        linkLeer: string;
        linkEscuchar: string;
        linkImagen: string;
        id: number;
    }>;
    remove(id: number): Promise<starkBook>;
    enviarCorreos(emailes: string[]): Promise<void>;
}
