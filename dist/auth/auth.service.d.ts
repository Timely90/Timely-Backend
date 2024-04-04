import { RegisterDto } from "./dto/register.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";
import { EmailDto, PassEmailDto } from "./dto/pass.dto";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly mailerService;
    constructor(usersService: UsersService, jwtService: JwtService, mailerService: MailerService);
    findAll(): Promise<import("../users/entities/user.entity").UserTimely[]>;
    register({ password, email, rol, name, isVerified }: RegisterDto): Promise<{
        message: string;
    }>;
    updateVerificacion(email: string, isVerified: boolean): Promise<{
        token: string;
        name: string;
        email: string;
    }>;
    login({ email, password }: LoginDto): Promise<{
        token: string;
        name: string;
        email: string;
    }>;
    updatePasswordEmail(email: string, passDto: PassEmailDto): Promise<{
        tokens: string;
        name: string;
        email: string;
        message: string;
    }>;
    registerEmail({ email }: EmailDto): Promise<{
        message: string;
    }>;
    envioEmail(user: any, email: string, correo: string): Promise<void>;
}