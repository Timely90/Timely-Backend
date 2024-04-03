import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<import("src/categories/entities/category.entity").CategoryBook[]>;
    findById(id: number): Promise<import("src/categories/entities/category.entity").CategoryBook>;
    create(createCategoryDto: CreateCategoryDto): Promise<import("src/categories/entities/category.entity").CategoryBook>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        description: string;
        id: number;
    }>;
    remove(id: number): Promise<import("src/categories/entities/category.entity").CategoryBook>;
}
