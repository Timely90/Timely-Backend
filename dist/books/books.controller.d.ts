import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(): Promise<import("src/books/entities/book.entity").starkBook[]>;
    findById(id: number): Promise<import("src/books/entities/book.entity").starkBook>;
    create(createBookDto: CreateBookDto): Promise<import("src/books/entities/book.entity").starkBook>;
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
    remove(id: number): Promise<import("src/books/entities/book.entity").starkBook>;
}
