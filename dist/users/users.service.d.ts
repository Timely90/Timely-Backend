import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserTimely } from "./entities/user.entity";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UserTimely>);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & UserTimely>;
    findOneByEmail(email: string): Promise<UserTimely>;
    updatePassword(email: string, newPassword: string): Promise<void>;
    findAllEmails(): Promise<{
        emailes: string[];
    }>;
    updateVerifi(email: string, isVerified: boolean): Promise<void>;
    updatePasswordEmail(email: string, password: string): Promise<void>;
    findAllUser(): Promise<UserTimely[]>;
}
