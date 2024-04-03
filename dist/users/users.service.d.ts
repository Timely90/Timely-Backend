import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserBook } from "./entities/user.entity";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UserBook>);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & UserBook>;
    findOneByEmail(email: string): Promise<UserBook>;
    updatePassword(email: string, newPassword: string): Promise<void>;
    findAllEmails(): Promise<{
        emailes: string[];
    }>;
    updateVerifi(email: string, isVerified: boolean): Promise<void>;
    updatePasswordEmail(email: string, password: string): Promise<void>;
    findAllUser(): Promise<UserBook[]>;
}
