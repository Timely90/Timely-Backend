import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { EmailDto, PassEmailDto } from "./dto/pass.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        name: string;
        email: string;
    }>;
    emailRegister(email: EmailDto): Promise<{
        message: string;
    }>;
    updatePasswordEmail(req: any, passDto: PassEmailDto): Promise<{
        tokens: string;
        name: string;
        email: string;
        message: string;
    }>;
    updateVerification(req: any, isVerified: boolean): Promise<{
        token: string;
        name: string;
        email: string;
    }>;
    findAll(): Promise<import("src/users/entities/user.entity").UserTimely[]>;
}
