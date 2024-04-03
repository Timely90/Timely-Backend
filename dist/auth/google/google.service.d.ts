import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class GoogleService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    googleLogin(req: any): Promise<{
        token: any;
        name: string;
        email: string;
    }>;
    private saveUser;
    private generateToken;
}
