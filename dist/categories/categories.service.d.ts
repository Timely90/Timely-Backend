import { CategoryBook } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: Repository<CategoryBook>);
    findAll(): Promise<CategoryBook[]>;
    findById(id: number): Promise<CategoryBook>;
    create(createCategoryDto: CreateCategoryDto): Promise<CategoryBook>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        description: string;
        id: number;
    }>;
    remove(id: number): Promise<CategoryBook>;
}
